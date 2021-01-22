# enye-express-backend

Api for getting Currency exchange rates

# How to use

[data source](https://api.exchangeratesapi.io/latest)

```javascript
const url = 'http://localhost:200/api/rates?base=USD&currency=GBP'

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
