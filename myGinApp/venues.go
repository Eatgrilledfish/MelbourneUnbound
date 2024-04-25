package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type Venue struct {
	Id                           int     `json:"id"`
	VenueName                    string  `json:"venue_name"`
	GoogleRating                 float64 `json:"google_rating"`
	Website                      string  `json:"website"`
	StreetAddress                string  `json:"street_address"`
	Img                          string  `json:"img"`
	AccessibilityRating          int     `json:"accessibility_rating"`
	AccessibilityType            string  `json:"accessibility_type"`
	AccessibilityTypeDescription string  `json:"accessibility_type_description"`
	Latitude                     float64 `json:"latitude"`
	Longitude                    float64 `json:"longitude"`
}

func VenuesHandler(c *gin.Context, db *sql.DB) {
	name := c.Query("name")
	address := c.Query("address")
	log.Printf("Received parameters - name: '%s', address: '%s'\n", name, address)

	// Debug: Print received parameters
	log.Printf("Received name: %s, address: %s\n", name, address)

	baseQuery := "SELECT id, venue_name, google_rating, website, street_address, img, accessibility_rating, accessibility_type, accessibility_type_description, latitude, longitude FROM public.venues_1"
	var args []interface{}
	var conditions []string

	if name != "" {
		conditions = append(conditions, "venue_name ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%'")
		args = append(args, name)
	}
	if address != "" {
		conditions = append(conditions, "street_address ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%'")
		args = append(args, address)
	}

	if len(conditions) > 0 {
		baseQuery += " WHERE " + strings.Join(conditions, " AND ")
	} else {
		baseQuery += " ORDER BY accessibility_rating DESC LIMIT 10"
	}

	// Debug: Print the final query and arguments
	log.Printf("Final query: %s\n", baseQuery)
	log.Printf("Arguments: %v\n", args)

	rows, err := db.Query(baseQuery, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	venues := []Venue{}
	for rows.Next() {
		var v Venue
		if err := rows.Scan(&v.Id, &v.VenueName, &v.GoogleRating, &v.Website, &v.StreetAddress, &v.Img, &v.AccessibilityRating, &v.AccessibilityType, &v.AccessibilityTypeDescription, &v.Latitude, &v.Longitude); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		venues = append(venues, v)
	}

	if len(venues) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No venues found"})
	} else {
		c.JSON(http.StatusOK, venues)
	}
}
