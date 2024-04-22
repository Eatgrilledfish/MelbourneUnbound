package main

import (
	docs "myGinApp/docs"
	"net/http"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// example doc
// @Summary ping example
// @Schemes
// @Description do ping
// @Tags example
// @Accept json
// @Produce json
// @Success 200 {string} Helloworld
// @Router /map/helloworld [get]
func Helloworld(g *gin.Context) {
	g.JSON(http.StatusOK, "helloworld")
}

// @BasePath /api/v1

func main() {
	r := gin.Default()
	docs.SwaggerInfo.BasePath = "/api"
	swaggerURL := ginSwagger.URL("http://localhost:8080/swagger/doc.json") // 指向 API 定义文件的 URL
	v1 := r.Group("/api")
	{
		eg := v1.Group("/map")
		{
			eg.GET("/helloworld", Helloworld)
		}
	}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler, swaggerURL))
	r.Run(":8080")

}
