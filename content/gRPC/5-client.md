---
title: "Implementing the client"
metaTitle: "Implementing the client"
metaDescription: "Implementing the client"
---

Now that the server-side is successfully implemented, let us write a simple client that can call the remote procedure that we defined by sending just a message as an argument. Create a file `client.go` in the project root and fill the following into it.
```golang
package main

import (
	"github.com/aquibbaig/train-status-grpc/enquiry"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"log"
)

func main() {
	var (
		conn *grpc.ClientConn
	)
	conn, err := grpc.Dial(":9000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not establish client connection %v", err)
	}
	defer conn.Close()

	cl := enquiry.NewTrainStatusClient(conn)
	message := enquiry.Message{
		TrainNumber: "242",
	}
	response, err := cl.ReturnTrainDetails(context.Background(), &message)
	if err != nil {
		log.Fatalf("Error while fetching response from grpc server: %v", err)
	}

	log.Printf("Response: %v", response)
}
```
***file: client.go***

We defined a pretty simple client which uses the "grpc package" to connect to the server in the backend. This connection object needs to connect to the train status client that adheres to our schema definitions. After that, we call our service by passing a message along with it.

# What is this context used for?
You might be wondering what a `context` is used for. Well, one of the use cases is that with protocol buffers, you can also define deadlines that if the response is not received in a specific number of seconds, it will be discarded.

# Testing our application
- Run the client using the command.
```
go run client.go
```
- Run the server using the command
```
go run server.go
```

# Result

You'd notice that the message is successfully received by the server and is logged on to the console s expected. That should be enough to have a beginner's understanding of gRPC and protocol buffers. Of course, you can minimise certain areas by reusing files than creating new ones, but I just did that for a clear understanding of how everything works. That brings the tutorial to an end. The final code can be found on the [repository](https://github.com/aquibbaig/train-status-grpc). If you have any queries, just open an issue.

# Resources
- [developers.google.com](https://developers.google.com/protocol-buffers)
- [Language guides](https://developers.google.com/protocol-buffers/docs/overview)
