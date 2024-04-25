package main

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type park struct {
	BuildingName                 string  `json:"building_name"`
	StreetAddress                string  `json:"street_address"`
	ClueSmallArea                string  `json:"clue_small_area"`
	NumberOfFloorsAboveGround    int     `json:"number_of_floors_above_ground"`
	PredominantSpaceUse          string  `json:"predominant_space_use"`
	AccessibilityType            string  `json:"accessibility_type"`
	AccessibilityTypeDescription string  `json:"accessibility_type_description"`
	AccessibilityRating          int     `json:"accessibility_rating"`
	Longitude                    float64 `json:"longitude"`
	Latitude                     float64 `json:"latitude"`
	Location                     string  `json:"location"`
	Img                          string  `json:"img"`
	Website                      string  `json:"website"`
}

func parksHandler(c *gin.Context, db *sql.DB) {
	buildingName := c.Query("building_name")
	streetAddress := c.Query("street_address")

	query := "SELECT building_name, street_address, clue_small_area, number_of_floors_above_ground, predominant_space_use, accessibility_type, accessibility_type_description, accessibility_rating, longitude, latitude, location, img, website FROM parks WHERE TRUE"
	var args []interface{}
	if buildingName != "" {
		query += " AND building_name ILIKE '%' || $1 || '%'"
		args = append(args, buildingName)
	}
	if streetAddress != "" {
		idx := len(args) + 1
		query += " AND street_address ILIKE '%' || $" + strconv.Itoa(idx) + " || '%'"
		args = append(args, streetAddress)
	}

	// Execute query
	rows, err := db.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	parks := []park{}
	for rows.Next() {
		var b park
		err := rows.Scan(&b.BuildingName, &b.StreetAddress, &b.ClueSmallArea, &b.NumberOfFloorsAboveGround, &b.PredominantSpaceUse, &b.AccessibilityType, &b.AccessibilityTypeDescription, &b.AccessibilityRating, &b.Longitude, &b.Latitude, &b.Location, &b.Img, &b.Website)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		parks = append(parks, b)
	}

	if len(parks) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No parks found"})
	} else {
		c.JSON(http.StatusOK, parks)
	}
}
