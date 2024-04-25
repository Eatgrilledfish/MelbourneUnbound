package main

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

type Top10Eatery struct {
	FormatAddress                string  `json:"format_address"`
	FormatName                   string  `json:"format_name"`
	GoogleRating                 float32 `json:"google_rating"`
	Website                      string  `json:"website"`
	AccessibilityRating          float32 `json:"accessibility_rating"`
	AccessibilityTypeDescription string  `json:"accessibility_type_description"`
	Photo                        string  `json:"photo"`
	RatingsTotal                 int     `json:"ratings_total"`
}

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
	router.GET("/top10eateries", getEateriesHandler)
	router.GET("/eaterydrink", func(c *gin.Context) {
		easterydrink(c, db)
	})

	router.Run() // 默认在localhost:8080
}

func getEateriesHandler(c *gin.Context) {
	eateries, err := readEateries("top10_eatery.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, eateries)
}

func readEateries(filePath string) ([]Top10Eatery, error) {
	file, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var eateries []Top10Eatery
	err = json.Unmarshal(file, &eateries)
	if err != nil {
		return nil, err
	}
	return eateries, nil
}

func easterydrink(c *gin.Context, db *sql.DB) {
	// 获取查询参数
	name := c.Query("name")
	address := c.Query("address")

	// 构建查询语句和参数列表
	query := "SELECT id, format_address, format_name, google_rating, website, accessibility_rating, accessibility_type_description, photo FROM public.eatery_drink_api_data WHERE photo IS NOT NULL"
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

	// 执行查询
	err := db.QueryRow(query, args...).Scan(&id, &formatAddress, &formatName, &googleRating, &website, &accessibilityRating, &accessibilityTypeDescription, &photo)
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
	})
}
