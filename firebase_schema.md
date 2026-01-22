# Firebase Firestore Schema

## Collections

### `users`
- `uid` (string)
- `username` (string)
- `profile_image` (string)

### `conversations`
- `conversationId` (string)
- `user1` (string): UID of user 1
- `user2` (string): UID of user 2

### `messages`
- `messageId` (string)
- `conversationId` (string)
- `content` (string)
- `message_at` (timestamp)
- `senderId` (string) - *Implicitly needed to know who sent it, adding for completeness though user didn't explicitly list it, it is essential.*
