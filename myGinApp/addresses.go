package main

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

// getAddresses 处理获取地址的请求
func getAddresses(c *gin.Context, db *sql.DB) {
	searchQuery := c.Query("search")
	searchPattern := "%" + searchQuery + "%"
	query := "SELECT address_pnt FROM get_address WHERE address_pnt ILIKE $1 LIMIT 10"

	rows, err := db.Query(query, searchPattern)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Query failed"})
		return
	}
	defer rows.Close()

	var addresses []string
	for rows.Next() {
		var addr string
		if err := rows.Scan(&addr); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read addresses"})
			return
		}
		addresses = append(addresses, addr)
	}

	c.JSON(http.StatusOK, addresses)
}
