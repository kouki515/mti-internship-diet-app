package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
)

type Request struct{
	UserID int `json:"user_id"`
}

type Response struct{
	Timestamp string `json:"timestamp"`
	TodayWeight float32 `json:"today_weight"`
}

var db *sql.DB

func init() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", "admin", "j2002214J", "team4-db.cylsclnu96ov.ap-northeast-1.rds.amazonaws.com", "teams4")
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	token := request.Headers["Authorization"]
	if token != "mtiToken" {
		return events.APIGatewayProxyResponse{StatusCode: 401, Body: "Unauthorized"}, nil
	}
	
	userIDString,ok := request.QueryStringParameters["user_id"]
	if !ok {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Invalid payload"}, nil
	}

	userIDInt, err := strconv.Atoi(userIDString)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Invalid user_id"}, nil
	}

	rows, err := db.Query("SELECT timestamp, MAX(today_weight) as today_weight FROM weight_logs GROUP BY timestamp ORDER BY timestamp DESC", userIDInt)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to query DB"}, err
	}

	defer rows.Close()

	var items []Response
	for rows.Next() {
		var item Response
		err = rows.Scan(&item.Timestamp, &item.TodayWeight)
		if err != nil {
			return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to read DB result"}, err
		}
		items = append(items, item)
	}

	res, err := json.Marshal(items)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to marshal response"}, err
	}

	return events.APIGatewayProxyResponse{StatusCode: 200, Body: string(res)}, nil
}



func main(){
	lambda.Start(handler)
}