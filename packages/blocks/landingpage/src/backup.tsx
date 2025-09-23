{/* <ImgStyling >
      

        <div style={{ display: "flex", justifyContent: "center" }}>

          <div style={{
            alignItems: "center", justifyContent: "center", width: "100%", height: "500px", overflow: "scroll", marginTop: 90, flexDirection: "row", scrollbarWidth: "none"
          }} >
            <div style={{ flex: 0 }}>
              {[...(this.imagesArray)].map((item, index) => (
                <VisibilitySensor data-test-id="visibleNode"
                  onChange={() => {
                    this.handleImageChange(item.id)
                  }}>
                  <Grid container spacing={2} style={{
                    marginTop: 0, position: "relative", width: "100%", height: "100%",
                    display: "flex", justifyContent: "center", alignItems: "center"
                  }}  >
                    <Grid item lg={6} md={12} sm={12} style={{}}>
                      <Box >
                        <Grid container spacing={4}>
                          <Grid item lg={12} md={12} sm={12} >
                            <div className="imgSideInner" >
                              <VisibilitySensor key={item.id}    >
                                <div >
                                  <img width={696}
                                    height={475}
                                    src={item.src}
                                  />
                                </div>
                              </VisibilitySensor>
                            </div>
                          </Grid>

                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} spacing={6} style={{ position: "sticky", overflow: "hidden" }}>
                      <Box >
                        <VisibilitySensor onChange={this.handleVisibilityChange}>
                          <div>
                            <Grid style={{
                              marginLeft: "154px", width: "372px", padding: 5,
                              marginTop: -190, position: "fixed"
                            }}>
                              <Typography gutterBottom variant="subtitle1" component="div" style={{ color: "blue" }}>
                                <h4 style={{ color: "#0131A8", fontSize: "20px", fontWeight: 700, fontFamily: "Inter" }}> {this.imagesArray[this.state.activeImage]?.id !== 0 ? "STEP " + ((this.imagesArray[this.state.activeImage]?.id)) : "HOW IT WORKS"}</h4>
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                <h1 style={{ color: "#000A34", fontSize: "36px", marginTop: "-20px", fontFamily: "Inter", letterSpacing: "-0.01em", fontWeight: 600, lineHeight: "44px" }}>{this.imagesArray[this.state.activeImage]?.title}</h1>
                              </Typography>
                              <Typography variant="body2" style={{ color: "#011342", fontFamily: "Inter", fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: "24px" }}>
                                {this.imagesArray[this.state.activeImage]?.description}
                              </Typography>
                            </Grid>
                          </div>
                        </VisibilitySensor></Box></Grid>
                  </Grid>
                </VisibilitySensor>
              ))}

            </div>
          </div>

          <div style={{ marginTop: 180, marginRight: -30 }}>
            <div className="vertical-progress-container">
              <div
                className="vertical-progress-bar"
                style={{ height: `${this.imagesArray[this.state.activeImage]?.progress}%` }}
              />
            </div>
          </div>

        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50, marginBottom: 30 }}>
          <h1 style={{ color: "#031742", fontWeight: "bold" }}>Remote Notarisation Services</h1>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <Grid container spacing={2} style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}>
            {this.state?.remoteArrayData?.map((item: any, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}
                style={webStyles.carouselItem}
              >

                <CardStyling style={{ height: "360px", marginLeft: 0 }} >
                  <Card style={{
                    width: "260px", height: "220px", padding: "16px 8px 16px 8px",
                    boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.08)", gap: "12px",
                    borderRadius: "8px",
                    background: "#fff"
                  }} className="card-style" >
                    <CardMedia
                      style={{ width: "48px", height: "48px", margin: "auto" }}
                      component="img"
                      height="140"
                      image={item.image}
                      alt={`Image ${index + 1}`}
                    />
                    <CardContent>
                      <Typography style={{ fontSize: "14px", fontFamily: "Font-SemiBold,", fontWeight: 600, paddingTop: "4%", margin: "auto", width: "80%", textAlign: "center", color: "#011342" }} gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography style={{ fontSize: "12px", fontFamily: "Inter", fontWeight: 500, paddingTop: "6%", textAlign: "center", color: "#011342" }} variant="body2">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardStyling>
              </Grid>
            ))}
          </Grid>
        </div>
      </ImgStyling> */}