/* config-overrides.js */
const { override, addWebpackPlugin } = require('react-app-rewired');
const path = require('path');

module.exports = function override(config, env) {
  // Disable ForkTsCheckerWebpackPlugin to avoid TypeScript errors blocking the build
  // We're using TSC_COMPILE_ON_ERROR=true but the plugin still checks types
  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
  );
  
  // Allow imports from outside src/ directory
  // Remove the ModuleScopePlugin which restricts imports to src/
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  );
  
  // Also add resolve modules
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, '../../'),
    path.resolve(__dirname, '../../blocks'),
    path.resolve(__dirname, '../components'),
  ];
  
  // Add extensions for TypeScript
  config.resolve.extensions = [
    ...(config.resolve.extensions || []),
    '.ts',
    '.tsx'
  ];
  
  // Add aliases for react-native compatibility on web
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-native': 'react-native-web',
  };
  
  // Fix AsyncStorage import issue in react-navigation
  // react-navigation tries to import AsyncStorage from 'react-native' but it doesn't exist in react-native-web
  const webpack = require('webpack');
  
  // Define __DEV__ for React Native compatibility (used in registerServiceWorker.js)
  config.plugins.push(
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(env === 'development'),
      'process.env.NODE_ENV': JSON.stringify(env || 'production'),
    })
  );
  
  // Use NormalModuleReplacementPlugin to replace react-native imports in react-navigation
  // with our wrapper that includes AsyncStorage
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /^react-native$/,
      function(resource) {
        // Only replace for react-navigation files that need AsyncStorage
        if (resource.context && resource.context.includes('react-navigation')) {
          // Replace with our wrapper that exports AsyncStorage
          resource.request = path.resolve(__dirname, 'react-native-asyncstorage-wrapper.js');
        }
      }
    )
  );
  
  // Process components directory JS files with React preset
  const componentsPath = path.resolve(__dirname, '../components');
  const blocksPath = path.resolve(__dirname, '../../packages/blocks');
  const frameworkPath = path.resolve(__dirname, '../framework');
  const oneOfRule = config.module.rules.find(rule => rule.oneOf);
  
  if (oneOfRule) {
    // Add a specific rule for .jsx files in components directory (must be first)
    oneOfRule.oneOf.unshift({
      test: /\.jsx$/,
      include: [componentsPath],
      use: [
        {
          loader: require.resolve('../../node_modules/react-scripts/node_modules/babel-loader/lib/index.js'),
          options: {
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-env'
            ],
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        }
      ]
    });
    
    // Find all JS/JSX rules and update them
    oneOfRule.oneOf.forEach(rule => {
      if (rule.test && rule.test.toString().includes('jsx?')) {
        // Get babel-loader from this rule
        const getBabelLoader = (use) => {
          if (Array.isArray(use)) {
            return use.find(u => u && u.loader && u.loader.includes('babel-loader'));
          } else if (use && use.loader && use.loader.includes('babel-loader')) {
            return use;
          }
          return null;
        };
        
        const babelLoader = getBabelLoader(rule.use);
        if (babelLoader && babelLoader.options) {
          // Ensure React preset is always included
          if (!babelLoader.options.presets) {
            babelLoader.options.presets = [];
          }
          const hasReact = babelLoader.options.presets.some(p => 
            (Array.isArray(p) && p[0] && (p[0].includes('react') || p[0].includes('@babel/preset-react'))) ||
            (typeof p === 'string' && (p.includes('react') || p.includes('@babel/preset-react')))
          );
          if (!hasReact) {
            babelLoader.options.presets.unshift(['@babel/preset-react', { runtime: 'automatic' }]);
          }
          // Also ensure JSX plugin is included
          if (!babelLoader.options.plugins) {
            babelLoader.options.plugins = [];
          }
          const hasJsxPlugin = babelLoader.options.plugins.some(p => 
            (typeof p === 'string' && p.includes('transform-react-jsx')) ||
            (Array.isArray(p) && p[0] && p[0].includes('transform-react-jsx'))
          );
          if (!hasJsxPlugin) {
            babelLoader.options.plugins.push('@babel/plugin-transform-react-jsx');
          }
          
          // Remove any exclude that might block components
          if (rule.exclude) {
            if (Array.isArray(rule.exclude)) {
              rule.exclude = rule.exclude.filter(exc => {
                if (typeof exc === 'function') {
                  return (filePath) => {
                    const result = exc(filePath);
                    // Don't exclude components directory
                    if (filePath && filePath.includes('components')) return false;
                    return result;
                  };
                }
                // Don't exclude components
                if (exc && exc.toString && exc.toString().includes('components')) {
                  return false;
                }
                return true;
              });
            } else if (typeof rule.exclude === 'function') {
              const originalExclude = rule.exclude;
              rule.exclude = (filePath) => {
                if (filePath && filePath.includes('components')) return false;
                return originalExclude(filePath);
              };
            }
          }
        }
        
        // Ensure components is included
        // Also include react-native-elements which has JSX in dist files
        if (rule.include) {
          if (Array.isArray(rule.include)) {
            if (!rule.include.some(inc => inc && inc.toString && inc.toString().includes('components'))) {
              rule.include.push(componentsPath);
            }
            // Include react-native-elements for JSX processing
            const rnePath = path.resolve(__dirname, '../../node_modules/react-native-elements');
            if (!rule.include.some(inc => inc && inc.toString && inc.toString().includes('react-native-elements'))) {
              rule.include.push(rnePath);
            }
          } else if (typeof rule.include === 'function') {
            const originalInclude = rule.include;
            const rnePath = path.resolve(__dirname, '../../node_modules/react-native-elements');
            rule.include = (filePath) => {
              return originalInclude(filePath) || 
                     (filePath && filePath.includes('components')) ||
                     (filePath && filePath.includes('react-native-elements'));
            };
          }
        } else {
          rule.include = [
            path.resolve(__dirname, 'src'),
            componentsPath,
            path.resolve(__dirname, '../../node_modules/react-native-elements')
          ];
        }
        
        // Remove exclude for react-native-elements
        if (rule.exclude) {
          if (Array.isArray(rule.exclude)) {
            rule.exclude = rule.exclude.filter(exc => {
              if (typeof exc === 'function') {
                return (filePath) => {
                  const result = exc(filePath);
                  if (filePath && filePath.includes('react-native-elements')) return false;
                  return result;
                };
              }
              if (exc && exc.toString && exc.toString().includes('react-native-elements')) {
                return false;
              }
              return true;
            });
          } else if (typeof rule.exclude === 'function') {
            const originalExclude = rule.exclude;
            rule.exclude = (filePath) => {
              if (filePath && filePath.includes('react-native-elements')) return false;
              return originalExclude(filePath);
            };
          }
        }
      }
    });
  }
  
  // Add specific rules for packages that need special babel processing
  // Split into separate rules for better performance and to avoid hangs
  if (oneOfRule) {
    let babelLoaderPath = null;
    
    // Find babel-loader once
    for (const rule of oneOfRule.oneOf) {
      if (rule.use) {
        const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
        for (const use of uses) {
          if (use && use.loader && use.loader.includes('babel-loader')) {
            babelLoaderPath = use.loader;
            break;
          }
        }
        if (babelLoaderPath) break;
      }
    }
    
    if (!babelLoaderPath) {
      try {
        babelLoaderPath = require.resolve('../../node_modules/react-scripts/node_modules/babel-loader');
      } catch (e) {
        // Ignore
      }
    }
    
    if (babelLoaderPath) {
      const nodeModulesPath = path.resolve(__dirname, '../../node_modules');
      
      // Rule 0: Explicitly exclude @zoom dist files from ALL processing (must be first)
      // These are pre-compiled and should not be processed by babel
      oneOfRule.oneOf.unshift({
        test: /\.js$/,
        include: (filePath) => {
          if (!filePath) return false;
          const pathStr = filePath.toString();
          return pathStr.includes('/@zoom/') && 
                 (pathStr.includes('/dist/') || pathStr.includes('videosdk-ui-toolkit.js'));
        },
        use: [
          {
            loader: require.resolve('../../node_modules/react-scripts/node_modules/file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ]
      });
      
      // Rule 1: React-native packages (JSX + Flow)
      // Exclude @zoom dist files and other compiled files
      const excludeZoomDist = (filePath) => {
        if (!filePath) return false;
        const pathStr = filePath.toString();
        return pathStr.includes('/@zoom/') && 
               (pathStr.includes('/dist/') || pathStr.includes('videosdk-ui-toolkit.js'));
      };
      
      oneOfRule.oneOf.unshift({
        test: /\.js$/,
        include: [
          path.resolve(nodeModulesPath, 'react-native-elements'),
          path.resolve(nodeModulesPath, 'react-native-ratings'),
          path.resolve(nodeModulesPath, 'react-native-vector-icons'),
          path.resolve(nodeModulesPath, 'react-native-screens'),
          path.resolve(nodeModulesPath, 'react-native-calendars'),
          path.resolve(nodeModulesPath, 'react-native-swipe-gestures'),
          path.resolve(nodeModulesPath, 'react-native-fs'),
          path.resolve(nodeModulesPath, 'react-navigation'),
          path.resolve(nodeModulesPath, 'react-navigation-deprecated-tab-navigator')
        ],
        exclude: [
          /node_modules\/react-native-web/,
          excludeZoomDist, // Exclude @zoom dist files
        ],
        use: [
          {
            loader: babelLoaderPath,
            options: {
              presets: [
                '@babel/preset-flow',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-env'
              ],
              plugins: ['@babel/plugin-transform-react-jsx']
            }
          }
        ]
      });
      
      // Rule 2: @zoom packages - exclude from babel processing
      // The dist files are already compiled and should be handled by webpack's default loaders
      // We exclude them from our custom babel rules to avoid processing issues
    }
  }
  
  // Add a specific rule for TypeScript files from blocks BEFORE other rules
  // React-scripts uses babel-loader with @babel/preset-typescript
  if (oneOfRule) {
    // Try to find babel-loader from existing rules first
    let babelLoaderPath = null;
    let babelLoaderOptions = {};
    
    for (const rule of oneOfRule.oneOf) {
      if (rule.use) {
        const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
        for (const use of uses) {
          if (use && use.loader && use.loader.includes('babel-loader')) {
            babelLoaderPath = use.loader;
            babelLoaderOptions = use.options || {};
            break;
          }
        }
        if (babelLoaderPath) break;
      }
    }
    
    // If not found in rules, try to require it directly from various locations
    if (!babelLoaderPath) {
      const possiblePaths = [
        'babel-loader',
        '../../node_modules/react-scripts/node_modules/babel-loader',
        '../../../node_modules/react-scripts/node_modules/babel-loader',
        path.resolve(__dirname, '../../node_modules/react-scripts/node_modules/babel-loader'),
        path.resolve(__dirname, '../../../node_modules/react-scripts/node_modules/babel-loader')
      ];
      
      for (const loaderPath of possiblePaths) {
        try {
          babelLoaderPath = require.resolve(loaderPath);
          break;
        } catch (e) {
          // Continue trying
        }
      }
      
      if (!babelLoaderPath) {
        console.warn('Could not resolve babel-loader from any location');
      }
    }
    
    if (babelLoaderPath) {
      // Add explicit rules for blocks and framework TypeScript files
      // These must be at the very beginning to match first
      const blocksFrameworkRule = {
        test: /\.(web\.)?tsx?$/,
        include: [
          blocksPath,
          frameworkPath,
          path.resolve(__dirname, '../../node_modules/react-native-calendars')
        ],
        exclude: (filePath) => {
          if (!filePath) return true;
          const pathStr = filePath.toString();
          // Exclude node_modules except react-native-calendars
          return pathStr.includes('/node_modules/') && 
                 !pathStr.includes('react-native-calendars');
        },
        use: [
          {
            loader: babelLoaderPath,
            options: {
              ...babelLoaderOptions,
              presets: [
                ...((babelLoaderOptions.presets || []).filter(p => 
                  !(typeof p === 'string' && (p.includes('typescript') || p.includes('react'))) &&
                  !(Array.isArray(p) && p[0] && (p[0].includes('typescript') || p[0].includes('react')))
                )),
                ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
                ['@babel/preset-react', { runtime: 'automatic' }]
              ],
              plugins: [
                ...((babelLoaderOptions.plugins || []).filter(p => 
                  !(typeof p === 'string' && p.includes('transform-react-jsx')) &&
                  !(Array.isArray(p) && p[0] && p[0].includes('transform-react-jsx'))
                )),
                '@babel/plugin-transform-react-jsx'
              ]
            }
          }
        ]
      };
      
      // Insert at the very beginning
      oneOfRule.oneOf.unshift(blocksFrameworkRule);
      
      // Debug: Log the rule that was added
      if (env === 'production') {
        console.log('Added TypeScript rule for blocks/framework:', {
          test: blocksFrameworkRule.test.toString(),
          include: blocksFrameworkRule.include,
          loader: babelLoaderPath
        });
      }
    } else {
      console.warn('Babel loader not found for TypeScript files from blocks/framework');
    }
  }
  
  // Process TypeScript files from blocks and components (reuse oneOfRule from above)
  if (oneOfRule) {
    // Find and update TypeScript rules - check for both .ts and .tsx patterns
    oneOfRule.oneOf.forEach(rule => {
      const testStr = rule.test ? rule.test.toString() : '';
      const isTypeScriptRule = testStr.includes('tsx?') || 
                              testStr.includes('\\.tsx?') || 
                              testStr.includes('ts') ||
                              testStr.includes('\.tsx') ||
                              testStr.includes('\.ts');
      
      if (isTypeScriptRule) {
        // Remove any exclude that might block blocks or components
        if (rule.exclude) {
          if (Array.isArray(rule.exclude)) {
            rule.exclude = rule.exclude.filter(exc => {
              if (typeof exc === 'function') {
                return (filePath) => {
                  const result = exc(filePath);
                  // Don't exclude blocks, framework or components
                  if (filePath && (filePath.includes('blocks') || filePath.includes('framework') || filePath.includes('components'))) return false;
                  return result;
                };
              }
                // Don't exclude blocks, framework or components
                if (exc && exc.toString && (exc.toString().includes('blocks') || exc.toString().includes('framework') || exc.toString().includes('components'))) {
                return false;
              }
              return true;
            });
          } else if (typeof rule.exclude === 'function') {
            const originalExclude = rule.exclude;
            rule.exclude = (filePath) => {
              if (filePath && (filePath.includes('blocks') || filePath.includes('framework') || filePath.includes('components'))) return false;
              return originalExclude(filePath);
            };
          }
        }
        
          // Make sure TypeScript files are included from blocks, framework and components
          if (rule.include) {
            if (Array.isArray(rule.include)) {
              if (!rule.include.some(inc => inc && inc.toString && inc.toString().includes('blocks'))) {
                rule.include.push(blocksPath);
              }
              if (!rule.include.some(inc => inc && inc.toString && inc.toString().includes('framework'))) {
                rule.include.push(frameworkPath);
              }
              if (!rule.include.some(inc => inc && inc.toString && inc.toString().includes('components'))) {
                rule.include.push(componentsPath);
              }
            } else if (typeof rule.include === 'function') {
              const originalInclude = rule.include;
              rule.include = (filePath) => {
                return originalInclude(filePath) || (filePath && (filePath.includes('blocks') || filePath.includes('framework') || filePath.includes('components')));
              };
            }
          } else {
            rule.include = [
              path.resolve(__dirname, 'src'),
              blocksPath,
              frameworkPath,
              componentsPath
            ];
          }
        
        // Ensure TypeScript loader is configured correctly
        if (rule.use) {
          const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
          uses.forEach(use => {
            if (use && use.loader && use.loader.includes('ts-loader')) {
              use.options = use.options || {};
              use.options.transpileOnly = true;
              use.options.compilerOptions = {
                ...(use.options.compilerOptions || {}),
                noEmit: false,
                jsx: 'react'
              };
            }
          });
        }
      }
    });
  }
  
  // Ignore TypeScript errors during build (minimatch issue)
  if (env === 'production') {
    // Find the TypeScript checker plugin and disable it or make errors non-fatal
    const tsCheckerIndex = config.plugins.findIndex(
      plugin => plugin && plugin.constructor && plugin.constructor.name === 'ForkTsCheckerWebpackPlugin'
    );
    
    if (tsCheckerIndex !== -1) {
      // Disable TypeScript checking in production build
      config.plugins[tsCheckerIndex].options.typescript = {
        ...config.plugins[tsCheckerIndex].options.typescript,
        diagnosticOptions: {
          semantic: false,
          syntactic: false,
        },
      };
    }
  }
  
  return config;
};
