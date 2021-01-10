---
title: "gRPC"
metaTitle: "Gophertuts | gRPC"
metaDescription: "Gophertuts | gRPC"
---

gRPC is a framework that uses RPC (Remote Procudure Call). The main concept behind RPC is that you can remotely call procedures from another application in another machine. In other words, a client application can directly call a method on a server application on a different machine as if it were a local object, making it easier for you to create distributed applications and services. As in many RPC systems, gRPC is based around the idea of defining a service, specifying the methods that can be called remotely with their parameters and return types. On the server side, the server implements this interface and runs a gRPC server to handle client calls.

![gRPC workflow](../content/images/grpc-flow.svg)

# Advantages of gRPC

- the earlier way of achieving a similar way of client-server communication was by using REST API.  
- REST API uses data encoded in JSON format whereas in gRPC, all we have are protocol buffers, client libraries are used to marshal and unmarshal into native formats (convert from protocol buffers to structs or classes). 
- gRPC is implemented using HTTP2 which is an upgrade over REST( HTTP1).
- gRPC solves the problem of having multiple client libraries available for multiple languages to allow your application send requests adhering to the HTTP protocol. For example, in Golang, we use `net/http` and `requests` module in Python. In gRPC, there is only one client library for all the popular programming languages, so in case we upgraded from HTTP2, the applications will automatically work because they are maintained by a single organisation, "Google!"
- supports directional and bidirectional streaming.
- gRPC uses protocol buffers, which are very flexible data serialization tools you can use in multiple applications. Read about advantages of protocol buffers [here](https://developers.google.com/protocol-buffers/docs/gotutorial#why-use-protocol-buffers).

Let's learn more about gRPC from a sample exercise!
