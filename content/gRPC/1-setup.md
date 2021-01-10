---
title: "Installations and project setup"
metaTitle: "Installations and project setup"
metaDescription: "Installations and project setup"
---

# What we'd be creating
The best way to learn the underlying concepts of gRPC would be by building an application side by side and understanding the concepts as they pop into the code. That way it would be better to visualise why something is the way it is.

- We would be building a simple `train-status` application which is mostly like a railway inquiry where you input the train number and it outputs it's schedule. We should be less concerned about
what the input and output are, the aim is to inspect the communication between the client and the server.

# Setting up the server

- Create a new file `server.go` and fill it up with a simple boilerplate code to start a server.

```golang
package main

import (
  "log"
  "net"
)

func main() {
  listener, err := net.Listen("tcp", ":8080")
  if err {
    log.Fatalf("Failed to listen on PORT 8080 %v", err)
  }
}
```
The above code uses the `net` package to create a server that listens on the PORT we provided in the argument and logs an error (if any).

# Using the gRPC package
The next step is to import the grpc package for golang and setting up the grpc server on top of the tcp connection we created above.
```diff
  package main

import (
	"log"
	"net"

+	"google.golang.org/grpc"
)

func main() {
  listener, err := net.Listen("tcp", ":8080")
  if err {
    log.Fatalf("Failed to listen on PORT 8080 %v", err)
  }
+	grpcServer := grpc.NewServer()
+	if err := grpcServer.Serve(lis); err != nil {
+	  log.Fatal(err)
+	}
}
```

# Results

We have now created a grpc server on port 8080 successfully. The `Serve` function which binds our listener accepts incoming connections on it, creating a new service goroutine for each. The service goroutines read gRPC requests and then call the registered handlers to reply to them. This method simply returns an error so it is important to handle that as well. You can now run the server using the command `go run server.go` to see that it actually works. The code upto this step can be
found [on my Github](https://github.com/aquibbaig/train-status-grpc/tree/792c760750610925977b65d1557b15bdaa8d2ca1).

<!-- ## Live Editing example

```javascript react-live=true
<button className={'btn btn-default'}>Change my text</button>
``` -->
