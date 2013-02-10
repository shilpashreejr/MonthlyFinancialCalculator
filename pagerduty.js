function curmonth() {
	var d=new Date();
    var month=new Array();
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
	var n = month[d.getMonth()];
	document.getElementById('currentmonth').innerHTML=n;
}

function expsave()
{
	document.getElementById('expsave').innerHTML="SAVED";
	var expcategory = $('#expcategory :selected').text();
	var expamount = $('#expamount').val();
	var expdesc = $('#expdesc').val();
	addNewDebt(expcategory, expdesc,parseFloat(expamount));

	$('#expdesc').val("");
	$('#expamount').val("");


}
function depsave()
{
	document.getElementById('expsave').innerHTML="SAVED";
	var expcategory = $('#incomeCategory :selected').text();
	var expamount = $('#incomeamount').val();
	var expdesc = $('#incomedesc').val();
	addNewIncome(expcategory, expdesc,parseFloat(expamount));

	$('#incomedesc').val("");
	$('#incomeamount').val("");
	document.getElementById('depsave').innerHTML="SAVED";
}

function addNewDebt(category, description, amount) {
				var existingData = lscache.get('DebtList');
				var transaction = {
						"category": category,
						"description": description,
						"amount": amount,
						"date": new Date()
					};
				if (!existingData) {
					//No Data available in local cache
					var data = [transaction];
					existingData = {
						'data': data
					};
				} else {
					//local cache data available
					existingData.data.push(transaction);
				}
				lscache.set('DebtList', {"data": existingData.data});
			}

			function addNewIncome(category, description, amount) {
				var existingData = lscache.get('IncomeList');
				var transaction = {
						"category": category,
						"description": description,
						"amount": amount,
						"date": new Date()
					};
				if (!existingData) {
					//No Data available in local cache
					var data = [transaction];
					existingData = {
						'data': data
					};
				} else {
					//local cache data available
					existingData.data.push(transaction);
				}
				lscache.set('IncomeList', {"data": existingData.data});
			}

			function getExpenseList() {
				var existingData = lscache.get('DebtList');
				var transactionList = {};
				if (existingData) {
					//local cache data available
					transactionList = existingData.data;
				}
				return transactionList;
			}

			function getIncomeList() {
				var existingData = lscache.get('IncomeList');
				var transactionList = {};
				if (existingData) {
					//local cache data available
					transactionList = existingData.data;
				}
				return transactionList;
			}

			function computeFinancialReportCurrentMonth() {
				var curDate = new Date();
				var curMonth = curDate.getMonth();
				var curYear = curDate.getYear();
				console.log(curMonth);
				var transactionList = getExpenseList();

				var monthlyExpenditure = 0;
				for (var i=0; i<transactionList.length; i++) {
					var transaction = transactionList[i];
					transDate = new Date(transaction.date);

					transMonth = transDate.getMonth();
					console.log(transMonth);
					transYear = transDate.getYear();

					if (transYear == curYear &&
						transMonth == curMonth) {
						monthlyExpenditure += transaction.amount;
					}
				}

				var incomeList = getIncomeList();
				var monthlyIncome = 0;
				for (var i=0; i<incomeList.length; i++) {
					var income = incomeList[i];
					incomeDate = new Date(income.date);
					incomeMonth = transDate.getMonth();
					incomeYear = transDate.getYear();

					if (incomeYear == curYear &&
						incomeMonth == curMonth) {
						monthlyIncome += income.amount;
					}
				}

				var returnData = {
					"expenditure": monthlyExpenditure,
					"income": monthlyIncome,
					"netSavings": monthlyIncome - monthlyExpenditure
				};

				return returnData;
			}
