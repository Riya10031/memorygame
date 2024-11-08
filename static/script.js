document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');

    fetch('/api/cards')
        .then(response => response.json())
        .then(cards => {
            const doubledCards = [...cards, ...cards];
            const shuffledCards = doubledCards.sort(() => 0.5 - Math.random());

            shuffledCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.dataset.name = card.name;

                const img = document.createElement('img');
                img.src = card.image;
                cardElement.appendChild(img);

                gameBoard.appendChild(cardElement);
            });

            let firstCard, secondCard;
            let lockBoard = false;

            gameBoard.addEventListener('click', event => {
                const clickedCard = event.target.closest('.card');
                if (!clickedCard || lockBoard || clickedCard === firstCard) return;

                clickedCard.classList.add('flipped');

                if (!firstCard) {
                    firstCard = clickedCard;
                    return;
                }

                secondCard = clickedCard;
                lockBoard = true;

                if (firstCard.dataset.name === secondCard.dataset.name) {
                    firstCard = secondCard = null;
                    lockBoard = false;
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        firstCard = secondCard = null;
                        lockBoard = false;
                    }, 1000);
                }
            });
        });
});
