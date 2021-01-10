---
title: "Creating a protocol buffer defintion"
metaTitle: "Creating a protocol buffer defintion"
metaDescription: "create a .proto file"
---

# What are .proto files
In the last step, we created our simple gRPC server. The next step for us is to define a form of data carrier or simply put, the way our client and server will communicate with each other. Well, first they need to agree upon the data they pass and for that, there needs to be a set of protocols and data formats. The good thing about gRPC is that it accepts protocol buffers, which agree on all the existing protocols such as SOAP, REST, and even websockets. Hence it can be said that gRPCs are a way to standardize client-server communication frameworks. Therefore the need to have a new `.proto` file came into existence.

# Messages and services
`.proto` files form the base of message-carrying in gRPC. They are configuration files where we define messages and services. These files are created in Google's Protocol Buffer format, a data serialization format used for exchanging data; specifies one or more "messages" as logical records, each of which contains name-value pairs. Messages are the smallest unit of data in gRPC. Essentially, a gRPC server accepts messages and does some processing on them, and returns something. gRPC services are used to carry messages between a client and a server. Think about messages as golang structs and services as functions.

# Creating your first .proto file
In the project root, create a new folder `enquiry` and a file named `enquiry.proto` inside it.
```
mkdir enquiry && cd enquiry && touch enquiry.proto
```
> With context to the application, we need to have a function that takes in a train number and displays its schedule. Initially, our message will contain a "train number" and then the message in the response will contain the "train schedule".

Now, let us create our very first message.
```proto
syntax="proto3";

package enquiry;

message Message {
  string trainNumber = 1;
}
```

A gRPC message contains fields just like a normal object in most languages or a struct in golang, however, there are two main differences:
- It is of a message type, which is automatically invoked as per "proto3" standards defined at the top of the file.
- The field numbers associated with each field. In proto3 syntax, each field belonging to a specific message must have a unique identifier known as "field numbers". 

# Message fields and field numbers
Fields in a message are associated with their unique field numbers that are used to identify your fields in the message binary format, and should not be changed once your message type is in use. Note that field numbers in the range 1 through 15 take one byte to encode, including the field number and the field's type (you can find out more about this in Protocol Buffer Encoding). Field numbers in the range 16 through 2047 take two bytes. So you should reserve the numbers 1 through 15 for very frequently occurring message elements. Remember to leave some room for frequently occurring elements that might be added in the future.

The smallest field number you can specify is 1, and the largest is 229 - 1, or 536,870,911. You also cannot use the numbers 19000 through 19999 (FieldDescriptor::kFirstReservedNumber through FieldDescriptor::kLastReservedNumber), as they are reserved for the Protocol Buffers implementation - the protocol buffer compiler will complain if you use one of these reserved numbers in your `.proto` file. Similarly, you cannot use any previously reserved field numbers.
You can learn more about field numbers in Google's official protocol buffer [documentation](https://developers.google.com/protocol-buffers/docs/proto3#assigning_field_numbers).

***NOTE: It is important to declare a package name that the .proto file belongs to, else the compiler will throw a WARNING.***

So, we should now have a clear understanding of how to define messages in a .proto file. We have defined our initial message, now for the message that will be sent from the server as a response, add the following to the `enquiry.proto` file.

```proto
syntax="proto3";

package enquiry;

message Message {
  string trainNumber = 1;
}

+ message TrainSchedule {
+   string stationName = 1;
+   string arrival = 2;
+   string departure = 3;
+ }
```

An important thing to notice is the response that is recieved from a normal train enquiry that looks like the following:

| Station  	| Arrival  | Departure | 
|---	|---	|---	|
| DADAR  	| 19:47 |  19:50 	|
|  KALYAN JN  	|  20:35 	|  20:37 	|
|  KASARA 	|  21:43 	|  21:45 	| 

***source: https://enquiry.indianrail.gov.in/ntes/index.html ***

The point is that we need to return an array of schedules for each of the stations that
the train covers. For that, we define another message that wraps the `TrainSchedule` object we declared above. Let's the following to the `.proto` file. Note that the `repeated` keyword here is a way of returning an array of messages in *proto3* syntax.
```proto
syntax="proto3";

package enquiry;

message Message {
  string trainNumber = 1;
}

message TrainSchedule {
  string stationName = 1;
  string arrival = 2;
  string departure = 3;
}

+ message EnquiryResponse {
+   repeated TrainSchedule resp = 1;
+ }
```

# Services
The last step is to define a service that tells the gRPC server what to do when a client requests something, or what to execute. As a service, we define a function that defines exactly what is being received by the gRPC server and what it is expected to return. A service can be defined as follows.
```proto
syntax="proto3";

package enquiry;

message Message {
  string trainNumber = 1;
}

message TrainSchedule {
  string stationName = 1;
  string arrival = 2;
  string departure = 3;
}

message EnquiryResponse {
  repeated TrainSchedule resp = 1;
}

+ service TrainStatus {
+   rpc ReturnTrainDetails(Message) returns (EnquiryResponse) {}
+ }
```

Just like messages, services are prefixed with `service` keyword as per *proto3* syntax. This service tells the gRPC server that when we call the function `ReturnTrainDetails` with a message that contains the "train number" it is expected to return an `EnquiryResponse` object defined above. Notice how we stub out the function without actually defining it. Why? The proto compiler takes care of actually generating the code that will handle all of this in the background which we will learn about in the subsequent chapter. Keep in mind that this service that we have defined exposes `ReturnTrainDetails` method to the client which can be called directly once it is connected to the gRPC server -- hence these are known as **Remote Procedure Calls**.


# Results

We have learnt about the schema definition in protocol buffers. In the next lesson, we will learn more about the proto compiler in details and proceed further into building our train status enquiry application. The code up to this step can be found [on my Github](https://github.com/aquibbaig/train-status-grpc/tree/5d838a465205dedce16b79f6f06e8bea7f4e03d3).
