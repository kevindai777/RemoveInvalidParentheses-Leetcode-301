//Objective is to remove the minimum number of parentheses to make the string
//valid, and to return all valid combinations

let s = "()())()"


//O(2^n) solution where n is the number of parentheses the string has
//We use a queue to backtrack every possible combination that works

let result = []
let queue = [s]
let done = false

while (queue.length > 0) {
    console.log(queue)
    let curr = queue.shift()
    
    //If the new string is valid, we know we've found the minimum 
    //number of parentheses to be removed, so we never enter the next 
    //function and instead test all remaining strings of the same length
    if (isValid(curr)) {
        result.push(curr)
        done = true
    }
    
    if (!done) {
        for (let i = 0; i < curr.length; i++) {

            //If we pass by a parentheses, we remove it and test the new string
            //by putting it in the queue
            if (curr[i] == '(' || curr[i] == ')') {
                let newString = curr.substring(0, i) + curr.substring(i + 1)
                
                if (!queue.includes(newString)) {
                    queue.push(newString)
                }
                
                //Skip any adjacent parentheses of the same type
                if (curr[i] == '(') {
                    while (curr[i + 1] == '(') {
                        i++
                    }
                } else {
                    while (curr[i + 1] == ')') {
                        i++
                    }
                }
            }
        }
    }
}

//Helper function to check if the new string is valid
function isValid(string) {
    let count = 0
    for (let i = 0; i < string.length; i++) {
        if (string[i] == '(') {
            count++
        } else if (string[i] == ')' && count-- == 0) {
            return false
        }
    }
    
    return count == 0
}

return result