# Chat-with-me
Chat application

![Mylogo](https://github.com/sakibhasancse/Chat-with-me/assets/57236854/abf1a81b-a7b0-47cd-a445-96d734684bc3)

# Features
### 1. News Feed Posts
Users can create and view posts on the news feed. Each post can contain text, images, or other media. Users can share updates, thoughts, or important information with their connections.

### 2. Post Management
Users have full control over their posts. They can create new posts, update the content of existing posts, and delete posts that are no longer relevant. This feature ensures that users can manage their own content easily.

### 3. Messages/Chat
Users can engage in text-based conversations with their connections using the chat feature. They can send and receive messages in real-time, making it convenient for quick and efficient communication.

### 4. Video Calling
The app provides a video calling feature that allows users to have face-to-face conversations. They can initiate video calls with their connections, enabling a more personal and interactive communication experience.

### 5. Audio Calling
In addition to video calling, users can also make audio calls to their connections. This feature is particularly useful in situations where video calling is not feasible or preferred, providing flexibility in communication options.

![chatwithme gift](https://github.com/sakibhasancse/Chat-with-me/assets/57236854/bc6288c0-3a89-411c-9f06-af46b68d9e65)


# Installation
Clone the repository:

```
git clone https://github.com/sakibhasancse/Chat-with-me.git
```
#### Prerequisites

- [Node](https://nodejs.org/en/)
- [Mongodb](https://www.mongodb.com/)

##### Steps

#### Server commands

- Create a `.env` file inside the `backend` directory. Add the below entries or change accordingly. You can follow the `.env.sample` file to see the format.

  ```
  MONGO_URL=
  PORT=8080
  JWT_SECRET=
  ACCESS_TOKEN_SECRET=
  REFRESH_TOKEN_SECRET=
  ```

- Open your terminal and run the following command

```sh
cd backend
npm install
npm start
```

#### Client commands

- Create a `.env` file inside the `frontend` directory. Add the below entries or change accordingly. You can follow the `.env.sample` file to see the format.

```
REACT_APP_BASE_API_URL=
```

- Run the following command

```sh
cd frontend
npm install
npm start
```

Access the app through your browser:
```
http://localhost:3000
```

# Technologies Used
- Node.js
- Express.js
- React
- SimplePair (for video and audio calling)
- MongoDB (for data storage)
- Socket.IO (for real-time messaging)

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

Please ensure that your pull request adheres to the following guidelines:

Follow the existing coding style and conventions.
Make sure your changes are well-documented.
Write clear and concise commit messages.

### Contact
If you have any questions, feel free to reach out to the project maintainer:

- Name: Sakib
- Email: cse.sakibhasan@gmail.com

We hope you enjoy using our chatting app! Happy chatting!
