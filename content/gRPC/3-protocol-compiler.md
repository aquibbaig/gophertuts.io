---
title: "Protocol compiler"
metaTitle: "Protocol compiler"
metaDescription: "Protocol compiler"
---

# The need for a compiler?

Protocol buffers are the flexible, efficient solution to serialise data rather than XML and JSON counterparts. It is pretty easy to encode and decode data in protocol buffers and new fields can be added with relative ease without adding more boilerplate code. All of this is thanks to the protocol buffer compiler which does the hard work for us in the background. It will all come to light once we see this in action.

# Protocol compiler
`protoc` is used to compile `.proto` files to generate classes that you will need to read/write messages. This compiler works on a `*.proto` file and creates a class file of the target language that you are working with. To download the compiler you need to go to the official releases section in [protobuf repository](https://github.com/protocolbuffers/protobuf/releases/) and follow the following steps:
- download the protoc release depending upon your system architecture.
- untar the package using `tar -xzvf <package_name>`.
- change directory into the extracted folder and configure the installation using the command `./configure`.
- setup the installation using `make`.
- finally, install the compiler using `sudo make install`.
- type `protoc` in your terminal to see if it works, else you might need to update $PATH settings.

***Note: Please check if there is a specific documentation as per your architecture [here](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).***

# Using protoc in golang
With `protoc` installed correctly, go to the `enquiry folder` that we had created and enter the following:
```shell
protoc-gen-go --go_out=plugins=grpc:enquiry enquiry.proto
```
This command will create a new "go file" based on the *.proto* definition in `enquiry.proto`, named `enquiry.pb.go`. If you look inside the contents of this file, you'll see certain helper functions and structs which are defined automatically by the protoc compiler adhering to schema we defined in our *.proto* file. The main functions to notice is there are getters for each field we defined in our message, also there will be a function that registers the service to our gRPC server. 

This feature is an advantage of protocol buffers since it reduces the overhead of writing extra boilerplate code. You may have thousands of fields and if you were to add one more, you'd just change the schema, not all of the underlying implementations of it. (for example, parsing when receiving response from the server).

# Result

So, we now have learnt about protocol buffers and the functions of protocol compiler. The code upto this step can be found [here](https://github.com/aquibbaig/train-status-grpc/tree/5d838a465205dedce16b79f6f06e8bea7f4e03d3).
