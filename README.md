# enye-express-backend

Api for getting Currency exchange rates

# How to use

[data source](https://exchangeratesapi.io/)

```javascript
url = 'https://enye-express-backend.herokuapp.com/api/rates?base=USD&currency=GBP'

// response
{
  "results":{
  "base":"USD",
  "date":"2021-01-21",
  "rates":{
    "GBP":0.7289439052
    }
}
```
