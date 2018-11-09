const cards=document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let lockboard=false;//CORNER_CASE1: To remove the bug due to multiple user clicks(card1,card2,card3)that leads to confusion
let firstcard,secondcard;
function flipcard()
{
	if(lockboard)//CORNER CASE 1
		return; //rest of code wont get executed \
	if(this==firstcard)// CORNER CASE2 : If the same card is clicked twice it remains open 
		return;			//So return if the first card is clicked for the second time again

	this.classList.add('flip');//If class is there remove it , if its not add it VERY IMPORTANT!
	//when a player clicks a card for the first time:-
	if(!hasFlippedCard){
		hasFlippedCard=true;
		firstcard= this;// current memory card
		console.log({hasFlippedCard,firstcard})

	}
	
	 else{
		hasFlippedCard=false;
		secondcard=this;
		checkForMatch();
	}
	//to check if the 2 cards match
	// we use the data attribute--> data-name add data-name or data-framework to every memory card
	//firstcard=document.querySelectorAll('.memory-card');
	//secondcard=document.querySelectorAll('.memory-card');
	//console.log(firstcard.dataset.framework);
	//console.log(secondcard.dataset.framework);
	
function checkForMatch() {

	let isMatch=firstcard.dataset.framework===secondcard.dataset.framework;
	
	isMatch? disableCards():unflipCards();
}

/*if(firstcard.dataset.framework===secondcard.dataset.framework)
	{
		//i.e, its a match so disable click option on these cards
		disableCards();
		console.log('function was executed');

	}
	else
	{
		unflippedCards();
		
		//problem :- second card immediately flips without the user seeing it
		//i.e, it does not respond to user click if it isnt a match
		//solution:-set a timer

	}
}*/

function disableCards()
{    
	firstcard.removeEventListener('click',flipcard);
		secondcard.removeEventListener('click',flipcard);
}
function unflipCards()
{	lockboard=true;
	setTimeout(()=>{firstcard.classList.remove('flip');secondcard.classList.remove('flip');lockboard=false;}, 1500);
}
}
//shuffle cards, before player starts the game
(function shuffle()
{
	//Generate a random number between 0 ands 11 and assign it to each card
	cards.forEach(card=>{
		let randomPos=Math.floor((Math.random()*12))
		card.style.order=randomPos;
	});
})(); //IIFE : Immediately Invoked Function Expression
cards.forEach(card=> card.addEventListener('click',flipcard));
