Uber Eats using MERN Stack
Technologies used:
#### 1. Kafka (for middleware)
#### 2. JWT, Passport for Authentication
#### 3. AWS for hosting ang image store
#### 4. Mocha for backed testing
#### 5. React testing library
Steps for deployment
Frontend and Backend
Open a seperate terminal in that folder.
Run npm install
Run npm start
Kafka Backend
Start Zookeeper and Kafka with following Commands

zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties

kafka-server-start /usr/local/etc/kafka/server.properties

Create Kafka Topics

kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic customer_login

kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic restaurant

kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic restaurant_orders

kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic restaurant_dishes

kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic


Open a seperate terminal in that folder.
Run npm install
Run npm start
