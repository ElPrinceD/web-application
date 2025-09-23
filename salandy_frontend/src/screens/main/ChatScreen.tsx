import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, Avatar, Badge } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState, AppDispatch } from '../../store';
import { fetchChatRooms } from '../../store/slices/chatSlice';
import { RootStackParamList } from '../../types';
import { COLORS } from '../../constants';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, isLoading } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    dispatch(fetchChatRooms());
  }, [dispatch]);

  const handleChatRoomPress = (roomId: string) => {
    navigation.navigate('ChatRoom' as any, { roomId });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const getUnreadCount = (roomId: string) => {
    // TODO: Calculate unread messages count
    return 0;
  };

  const renderChatRoom = ({ item }: { item: any }) => {
    const unreadCount = getUnreadCount(item.id);
    
    return (
      <Card
        style={styles.chatRoomCard}
        onPress={() => handleChatRoomPress(item.id)}
      >
        <Card.Content style={styles.chatRoomContent}>
          <Avatar.Text
            size={50}
            label={item.type === 'service_request' ? 'S' : 'E'}
            style={[
              styles.avatar,
              { backgroundColor: item.type === 'service_request' ? COLORS.primary : COLORS.secondary }
            ]}
          />
          
          <View style={styles.chatRoomInfo}>
            <View style={styles.chatRoomHeader}>
              <Title style={styles.chatRoomTitle}>
                {item.type === 'service_request' ? 'Service Request' : 'Emergency Chat'}
              </Title>
              <Text style={styles.chatRoomTime}>
                {item.lastMessage ? formatTime(item.lastMessage.timestamp) : ''}
              </Text>
            </View>
            
            <Paragraph style={styles.chatRoomLastMessage} numberOfLines={1}>
              {item.lastMessage ? item.lastMessage.content : 'No messages yet'}
            </Paragraph>
          </View>

          {unreadCount > 0 && (
            <Badge style={styles.unreadBadge}>
              {unreadCount}
            </Badge>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Chat</Title>
        <Paragraph style={styles.headerSubtitle}>
          Your conversations and support chats
        </Paragraph>
      </View>

      {rooms.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No conversations yet</Text>
          <Paragraph style={styles.emptyStateText}>
            Start a service request or emergency chat to begin conversations
          </Paragraph>
        </View>
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderChatRoom}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatRoomsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 8,
  },
  chatRoomsList: {
    padding: 16,
  },
  chatRoomCard: {
    marginBottom: 12,
    elevation: 2,
  },
  chatRoomContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  chatRoomInfo: {
    flex: 1,
  },
  chatRoomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatRoomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  chatRoomTime: {
    fontSize: 12,
    color: COLORS.gray,
  },
  chatRoomLastMessage: {
    color: COLORS.gray,
    fontSize: 14,
  },
  unreadBadge: {
    backgroundColor: COLORS.secondary,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 12,
  },
  emptyStateText: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 16,
  },
});

export default ChatScreen;


