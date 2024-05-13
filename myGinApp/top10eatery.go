package main

import (
	"database/sql"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type Top10Eatery struct {
	ID                           int     `json:"id"`
	FormatAddress                string  `json:"format_address"`
	FormatName                   string  `json:"format_name"`
	GoogleRating                 float64 `json:"google_rating"`
	Website                      string  `json:"website"`
	AccessibilityRating          float64 `json:"accessibility_rating"`
	AccessibilityTypeDescription string  `json:"accessibility_type_description"`
	AccessibilityType            string  `json:"accessibility_type"`
	Photo                        string  `json:"photo"`
	FinalScore                   float64 `json:"final_score"`
	Latitude                     float64 `json:"latitude"`
	Longitude                    float64 `json:"longitude"`
}

func EateryHandler(c *gin.Context, db *sql.DB) {
	name := c.Query("name")
	address := c.Query("address")
	baseQuery := "SELECT id, format_address, format_name, google_rating, website, accessibility_rating, accessibility_type_description,accessibility_type, photo, 5 * ((google_rating / 5.0 * 0.3) + (accessibility_rating / 3.0 * 0.7))  AS final_score ,latitude,longitude FROM public.eatery_info"
	var args []interface{}
	var conditions []string
	if name != "" {
		conditions = append(conditions, "format_name ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%' LIMIT 1;")
		args = append(args, name)
	}
	if address != "" {
		conditions = append(conditions, "format_address ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%' LIMIT 1;")
		args = append(args, address)
	}

	if len(conditions) > 0 {
		baseQuery += " WHERE " + strings.Join(conditions, " AND ")
	} else {
		baseQuery += " WHERE photo IS NOT NULL and ratings_total > 20 and id != 1900 and id != 1374 ORDER BY final_score DESC LIMIT 10"
	}

	rows, err := db.Query(baseQuery, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	eateries := []Top10Eatery{}
	for rows.Next() {
		var e Top10Eatery
		if err := rows.Scan(&e.ID, &e.FormatAddress, &e.FormatName, &e.GoogleRating, &e.Website,
			&e.AccessibilityRating, &e.AccessibilityTypeDescription, &e.AccessibilityType, &e.Photo, &e.FinalScore, &e.Latitude, &e.Longitude); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		eateries = append(eateries, e)
	}

	if len(eateries) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No eateries found"})
	} else {
		c.JSON(http.StatusOK, eateries)
	}
}
