package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type Retail struct {
	Id                           int     `json:"id"`
	FormatName                   string  `json:"format_name"`
	FormatAddress                string  `json:"format_address"`
	GoogleRating                 float32 `json:"google_rating"`
	Website                      string  `json:"website"`
	AccessibilityRating          float32 `json:"accessibility_rating"`
	AccessibilityTypeDescription string  `json:"accessibility_type_description"`
	Photo                        string  `json:"photo"`
}

func RetailHandler(c *gin.Context, db *sql.DB) {
	name := c.Query("name")
	address := c.Query("address")

	log.Printf("Received parameters - Name: '%s', Address: '%s'\n", name, address)

	baseQuery := "SELECT id, format_name, format_address, google_rating, website, accessibility_rating, accessibility_type_description, photo FROM public.venues"
	var args []interface{}
	var conditions []string

	if name != "" {
		conditions = append(conditions, "format_name ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%'")
		args = append(args, name)
	}
	if address != "" {
		conditions = append(conditions, "format_address ILIKE '%' || $"+strconv.Itoa(len(args)+1)+" || '%'")
		args = append(args, address)
	}

	if len(conditions) > 0 {
		baseQuery += " WHERE " + strings.Join(conditions, " AND ")
	} else {
		baseQuery += " ORDER BY google_rating DESC LIMIT 10"
	}

	log.Printf("Executing query: %s with arguments: %v\n", baseQuery, args)

	rows, err := db.Query(baseQuery, args...)
	if err != nil {
		log.Printf("Error querying database: %s\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}
	defer rows.Close()

	var retail []Retail
	for rows.Next() {
		var v Retail
		if err := rows.Scan(&v.Id, &v.FormatName, &v.FormatAddress, &v.GoogleRating, &v.Website, &v.AccessibilityRating, &v.AccessibilityTypeDescription, &v.Photo); err != nil {
			log.Printf("Error scanning row: %s\n", err)
			continue
		}
		retail = append(retail, v)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Error during row iteration: %s\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving data"})
		return
	}

	if len(retail) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No retail found"})
	} else {
		c.JSON(http.StatusOK, retail)
	}
}
