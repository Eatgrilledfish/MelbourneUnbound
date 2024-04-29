import requests
import gtfs_realtime_pb2

# API的URL和订阅密钥
url = "https://data-exchange-api.vicroads.vic.gov.au/opendata/gtfsr/v1/tram/vehicleposition"
headers = {
    "Ocp-Apim-Subscription-Key": "af02fa9cf4764385ad592b462db4ec8e"
}

# 发送请求
response = requests.get(url, headers=headers)

# 检查响应状态
if response.status_code == 200:
    # 创建GTFS Realtime FeedMessage对象
    feed = gtfs_realtime_pb2.FeedMessage()
    try:
        # 解析Protobuf数据
        feed.ParseFromString(response.content)
        
        # 保存到文件
        with open("vehicle_position1.pb", "wb") as file:
            file.write(response.content)
        print("Data saved to vehicle_position.pb")
    except Exception as e:
        print("Failed to parse GTFS Realtime data:", e)
else:
    print("Failed to fetch data:", response.status_code)
