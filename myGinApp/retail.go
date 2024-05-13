package main

import (
	"database/sql"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type Retails struct {
	Id                  int     `json:"id"`
	RetailName          string  `json:"name"`
	GoogleRating        float64 `json:"rating"`
	Website             string  `json:"website"`
	StreetAddress       string  `json:"address"`
	Img                 string  `json:"photo_filename"`
	AccessibilityRating float64 `json:"accessibility_rating"`
	AccessibilityType   string  `json:"accessibility_type"`
	Latitude            float64 `json:"latitude"`
	Longitude           float64 `json:"longitude"`
	Final_score         float64 `json:"final_score"`
}

func RetailsHandler(c *gin.Context, db *sql.DB) {
	name := c.Query("name")
	address := c.Query("address")

	baseQuery := "SELECT id, name, rating, website, address, photo_filename, accessibility_rating, accessibility_type, latitude, longitude, 5 * ((rating / 5.0 * 0.3) + (accessibility_rating / 3.0 * 0.7)) AS final_score FROM public.retails_info"
	var args []interface{}
	var conditions []string

	if name != "" {
		conditions = append(conditions, "name ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%' LIMIT 1;")
		args = append(args, name)
	}
	if address != "" {
		conditions = append(conditions, "address ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%' LIMIT 1;")
		args = append(args, address)
	}

	if len(conditions) > 0 {
		baseQuery += " WHERE " + strings.Join(conditions, " AND ")
	} else {
		baseQuery += " WHERE user_rating_count > 20 ORDER BY final_score DESC LIMIT 10"
	}

	// Debug: Print the final query and arguments

	rows, err := db.Query(baseQuery, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	retail := []Retails{}
	for rows.Next() {
		var v Retails
		if err := rows.Scan(&v.Id, &v.RetailName, &v.GoogleRating, &v.Website, &v.StreetAddress, &v.Img, &v.AccessibilityRating, &v.AccessibilityType, &v.Latitude, &v.Longitude, &v.Final_score); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		retail = append(retail, v)
	}

	if len(retail) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No retail found"})
	} else {
		c.JSON(http.StatusOK, retail)
	}
}
