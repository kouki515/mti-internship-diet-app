package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
)

type Request struct{
	UserID int `json:"user_id"`
	TodayWeight float32 `json:"today_weight"`
	Timestamp string `json:"timestamp"`
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
	token := request.Headers["authorization"]
	if token != "5da50cf80844d2cdab1bc15aa9e64802c7d365dec585b2896b9ef46f4274bfc2" {
		return events.APIGatewayProxyResponse{StatusCode: 401, Body: "Unauthorized"}, nil
	}
	body := Request{}
	err := json.Unmarshal([]byte(request.Body), &body)

	_, err = db.Exec("UPDATE user_details SET weight = ? WHERE users_id = ?", body.TodayWeight, body.UserID)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to insert data into DB"}, errors.New("DB Insert Error")
	}

	_, err = db.Exec("INSERT INTO weight_logs (user_id, today_weight, timestamp) VALUES (?, ?, ?)", body.UserID, body.TodayWeight,body.Timestamp)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to insert data into DB"}, errors.New("DB Insert Error")
	}

	return events.APIGatewayProxyResponse{StatusCode: 200, Body: "Success"}, nil
}



func main(){
	lambda.Start(handler)
}