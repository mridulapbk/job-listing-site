package main

import (
	"fmt"
	"log"
	"os/exec"
)

func main() {
	
	fmt.Println("Starting Node.js script...")
	cmd := exec.Command("node", "app.js")

	
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("Failed to run Node.js script: %v\nOutput: %s", err, output)
	}

	fmt.Println("Node.js script output:", string(output))
}
