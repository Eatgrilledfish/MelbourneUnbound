package main

import (
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func TestTextToSpeech(c *gin.Context) {
	text := "Hello, this is a test to synthesize speech using Azure's Text to Speech Service."
	apiKey := "cd1b2377c0cb43d9b1e44c0a41bf377b" // Replace with your Azure subscription key
	region := "australiaeast"                    // Replace with your Azure service region

	audioContent, err := textspeech(text, apiKey, region)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to convert text to speech", "details": err.Error()})
		return
	}

	// Send the audio content as a response
	c.Data(http.StatusOK, "audio/mpeg", audioContent)
}

func textspeech(text, apiKey, region string) ([]byte, error) {
	ssml := fmt.Sprintf(`<speak version="1.0" xml:lang="en-US"><voice name="en-US-EmmaMultilingualNeural">%s</voice></speak>`, text)
	url := fmt.Sprintf("https://%s.tts.speech.microsoft.com/cognitiveservices/v1", region)
	client := &http.Client{}
	req, err := http.NewRequest("POST", url, strings.NewReader(ssml))
	if err != nil {
		return nil, fmt.Errorf("creating request failed: %v", err)
	}

	req.Header.Set("Content-Type", "application/ssml+xml")
	req.Header.Set("X-Microsoft-OutputFormat", "audio-16khz-128kbitrate-mono-mp3")
	req.Header.Set("Ocp-Apim-Subscription-Key", apiKey)

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request to Azure TTS failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		responseBody, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("Azure TTS API error: status %d, body: %s", resp.StatusCode, responseBody)
	}

	audioData, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("reading audio data failed: %v", err)
	}

	return audioData, nil
}
