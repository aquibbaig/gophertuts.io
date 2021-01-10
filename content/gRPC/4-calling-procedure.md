---
title: "Exposing the service"
metaTitle: "Exposing the service"
metaDescription: "Exposing the service"
---

To understand how our application will work, this is the final step in creating the server. We will now define `ReturnTrainDetails` function, which we stubbed out in our schema as a service.

Let's create a new file in the enquiry package named `train-status.go` and fill the contents as follows:
```golang
package enquiry

import (
	"golang.org/x/net/context"
	"log"
)

type Server struct {

}

func (s *Server) ReturnTrainDetails (ctx context.Context, message *Message) (*EnquiryResponse, error){
	log.Printf("Recieved message from the grpc server %v", message)
  t := &TrainSchedule{
		StationName:   "DDL",
		Arrival:       "8:00",
		Departure:     "12:00",
	}
	respSlice := make([]*TrainSchedule, 0, 2)
	respSlice = append(respSlice, t)
	return &EnquiryResponse{
		Resp: respSlice,
	}, nil
}
```

So, for the sake of this application, I have returned a hard-coded struct at the end, but we do not care about what is being returned from this function because that's just post-processing on the server-side. What matters is when the client calls this function with a message, we would be able to log that on the first line of the function definition and that's what we are after.


# Registering the service in our golang server

```golang
package main

import (
// import path statement to your enquiry package
+ "path/to/enquiry-package"
  "google.golang.org/grpc"
  "log"
  "net"
)

func main() {
  log.Fatalf("Could not listen at PORT 9000 %v", err)
}
grpcServer := grpc.NewServer()

+ // enquiry server struct.
+ serv := enquiry.Server{}
+
+ // Register the server.
+ enquiry.RegisterTrainStatusServer(grpcServer, &serv)
+
if err := grpcServer.Serve(lis); err != nil {
  log.Fatalf("Error creating gRPC server %v", err)
}
```
***file: server.go***

Think about the `train-status.go` file as a router file used in javascript which exposes your API endpoints. Here, when we connected that with the existing gRPC server through a function `RegisterTrainStatusServer` provided by `enquiry.pb.go` file which we created when we compiled our schema, it automatically exposed our service definition. The clients connected to this gRPC server now can directly call the services. 

# Connecting dots

You would be wondering how does `RegisterTrainStatusServer` function know where our service is defined to be able to connect our server to it? We just have passed an empty struct `serv` as an argument, meaning we could pass anything and it would work, right?

- Have at the definition of `RegisterTrainStatusServer`
```golang
func RegisterTrainStatusServer(s *grpc.Server, srv TrainStatusServer) {
	s.RegisterService(&_TrainStatus_serviceDesc, srv)
}
```
***file: enquiry/enquiry.pb.go***

- When we inspect the TrainStatusServer struct which is the second argument of the function, we will see that it is an interface which contains a method that returns the same thing that our service definition does as follows.

```golang
type TrainStatusServer interface {
    ReturnTrainDetails(context.Context, *Message) (*EnquiryResponse, error)
}
```
I think it would be clear to most people now! If not, allow me to explain.

This server struct we created in `train-status.go` is not empty but it contains a method bound to it namely `ReturnTrainDetails`. So, the TrainStatusServer is supposed to be an alias of the server we created, hence everything is perfect as it should. Also, in the future, if we wanted to add another service, look how easily we could do that. We just need to add one more definition and we're done.

# Result

So, we have successfully learnt how to expose methods to the client. This completes our server side implementation. The code upto this step can be found [here](https://github.com/aquibbaig/train-status-grpc/tree/893046d845c6f939b412fd6822e60c114392ef85).
