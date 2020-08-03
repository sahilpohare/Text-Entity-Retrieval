# Email-Parser
Pass a template and input in form of json and it returns json with with parsed values.

### Example 

##### Request JSON
```javascript
{
    "template" : "my name is $name and I do $activities",
    "inputString" : "my name is John Doe and I do coding, gaming and singing",
    "variables" : [
        {
            "varName" : "name",
            "type" : "string"
        },
        {
            "varName" : "activities",
            "type" : "array",
            "separator" : ",|and"
        }
    ]
}
```

##### Response JSON
```javascript
{
  "name" : "John Doe",
  "activities" : [
     "coding",
     "gaming",
     "singing"
  ]
}
```
## Usage
 
### Request JSON Variables

#### Variable `template`
##### type : `<string>`
Use `$variableName` format in string to tag variables. This will be used to pars
 > example `"He does $stuff"`.
#### Variable `inputString`
##### type : `<string>`

