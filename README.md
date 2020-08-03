# Email-Parser
Pass a template and input in form of json and it returns json with with parsed values.

# Running

```
//Setup
npm install

//Running in Dev Mode
npm run dev

//Running in Production Mode
npm start
```

# Testing
```
//Pass any json file as the argument
npm test testReq.json
```

### Example 

##### Request JSON
```json
{
    "template" : "my name is $name and I do $activities . I feel $emotion",
    "inputString" : "my name is John Doe and I do coding, gaming and singing. I feel happy .",
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
```json
{
  "name" : "John Doe",
  "activities" : [
     "coding",
     "gaming",
     "singing"
  ],
  "emotion" : "happy"
}
```
# Usage
 
### Request JSON Variables

#### Variable `"template"` | type : `<string>`
##### Description
Use `$variableName` format in string to tag variables. This will be used to parse `"inputString"`
Example `"template" : "my name is $name and I do $activities"`.

#### Variable `"inputString"` | type : `<string>`
##### Description 
This is compared against `"template"` variable
Example `"inputString" : "my name is John Doe and I do coding, gaming and singing"`

#### Variable `"variables"` | type `<varTemplate[]> | <object[]>`
##### Usage
This stores the metadata for the variables extracted.
*Note it assumes variable `type` is `string` if variable is not included in the array.

Example 
```json
[
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
```

#### Interface `varTemplate`
```javascript
{
    //used to cross reference the variable name with template
    varName : <string>,

    //Used to define variable type. 
    //Assumes type = "string" when varTemplate object is not included for a particular variable. 
    type : <string>,

    
    //Used to split a string.

    // e.g. separator ',|and' splits "coding, gaming and having fun" 
    // into array 
    //     [
    //     "coding",
    //     "gaming",
    //     "having fun"
    //     ] 
   
    //Only needed when type == "array"
    separator? : <regex> | <string>

}