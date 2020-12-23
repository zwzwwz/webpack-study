require('../css/index.css')

var componnent = require('./component.js');
document.body.appendChild(componnent())


fetch('/xhx_middle/getMessage?channel=1').then(res => {
	// 被代理到 http://debug.xxx.com/device/space
	return res.json();
}).then(res => {
	console.log(res);
})


import addContent from './add-content.js'
addContent()



const calculator = require('./calculator.js')
const add = calculator.add
const sum = add(2, 3)
console.log('sum:', sum)
const moduleName = calculator.name
console.log('moduleName', moduleName)



const moduleName1 = ['add-content.js', 'calculator.js'];
moduleName1.forEach(name => {
	console.log(require(`./${name}`))
})



import nameTest, {
	name1 as caluName,
	getSum
} from './export1.js';
import * as allFunc from './export1.js'
console.log(caluName, getSum(1, 5))
console.log(allFunc)
console.log(nameTest)



require(['./amdFunc.js'], function(getSum){
	console.log(getSum)
})