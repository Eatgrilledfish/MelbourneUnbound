package main

import (
	"database/sql"
	"net/http"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	router := gin.Default()

	// 配置CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // 这里应该是你的前端地址
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// 加载数据库连接
	db := connectDB()
	defer db.Close() // 确保在程序结束时关闭数据库连接

	// 添加API路由
	router.GET("/top10eateries", func(c *gin.Context) {
		EateryHandler(c, db)
	})
	router.GET("/eaterydrink", func(c *gin.Context) {
		easterydrink(c, db)
	})
	router.GET("/parks", func(c *gin.Context) {
		parksHandler(c, db)
	})
	router.GET("/venues", func(c *gin.Context) {
		VenuesHandler(c, db)
	})
	router.GET("/addresses", func(c *gin.Context) {
		getAddresses(c, db)
	})

	router.Run() // 默认在localhost:8080
}

func easterydrink(c *gin.Context, db *sql.DB) {
	// 获取查询参数
	name := c.Query("name")
	address := c.Query("address")

	// 构建查询语句和参数列表
	query := "SELECT id, format_address, format_name, google_rating, website, accessibility_rating, accessibility_type_description, photo,  5 * ((google_rating / 5.0 * 0.3) + (accessibility_rating / 3.0 * 0.7)) AS final_score FROM public.eatery_drink_api_data WHERE photo IS NOT NULL"
	var args []interface{}
	if name != "" {
		query += " AND format_name ILIKE '%' || $1 || '%'"
		args = append(args, name)
	}
	if address != "" {
		if name != "" {
			query += " AND format_address ILIKE '%' || $2 || '%'"
			args = append(args, address)
		} else {
			query += " AND format_address ILIKE '%' || $1 || '%'"
			args = append(args, address)
		}
	}
	query += " LIMIT 1;" // 你可以根据需要调整或删除限制

	var id int
	var formatAddress string
	var formatName string
	var googleRating float32
	var website string
	var accessibilityRating float32
	var accessibilityTypeDescription string
	var photo string
	var final_score float32

	// 执行查询
	err := db.QueryRow(query, args...).Scan(&id, &formatAddress, &formatName, &googleRating, &website, &accessibilityRating, &accessibilityTypeDescription, &photo, &final_score)
	if err != nil {
		if err == sql.ErrNoRows {
			// 如果没有找到记录，返回没有找到的信息
			c.JSON(http.StatusOK, gin.H{"message": "No records found"})
		} else {
			// 如果有其他错误，返回内部服务器错误
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// 如果找到了记录，返回它
	c.JSON(http.StatusOK, gin.H{
		"id":                             id,
		"format_address":                 formatAddress,
		"format_name":                    formatName,
		"google_rating":                  googleRating,
		"website":                        website,
		"accessibility_rating":           accessibilityRating,
		"accessibility_type_description": accessibilityTypeDescription,
		"photo":                          photo,
		"final_score":                    final_score,
	})
}
