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
	WeightGoals float32 `json:"weight_goal"`
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
	body := Request{}
	err := json.Unmarshal([]byte(request.Body), &body)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Invalid payload"}, nil
	}

	_, err = db.Exec("INSERT INTO weight_goals (user_id, weight_goal) VALUES (?, ?)", body.UserID, body.WeightGoals)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to insert data into DB"}, errors.New("DB Insert Error")
	}

	return events.APIGatewayProxyResponse{StatusCode: 200, Body: "Success"}, nil
}



func main(){
	lambda.Start(handler)
}