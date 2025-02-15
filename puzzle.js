document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById("puzzle-container");
    const message = document.getElementById("message");
    const imageUrl = "your-image.jpg"; // Replace with your couple photo

    let order = [...Array(9).keys()]; // [0,1,2,3,4,5,6,7,8] (correct order)
    order = order.sort(() => Math.random() - 0.5); // Shuffle pieces

    order.forEach((num) => {
        let piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `${(num % 3) * -100}px ${(Math.floor(num / 3)) * -100}px`;
        piece.setAttribute("draggable", true);
        piece.dataset.index = num;
        puzzleContainer.appendChild(piece);
    });

    let draggedPiece = null;

    document.querySelectorAll(".puzzle-piece").forEach(piece => {
        piece.addEventListener("dragstart", function(event) {
            draggedPiece = this;
            event.dataTransfer.setData("text", this.dataset.index);
        });

        piece.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        piece.addEventListener("drop", function(event) {
            event.preventDefault();
            let draggedIndex = draggedPiece.dataset.index;
            let targetIndex = this.dataset.index;

            // Swap dataset indexes
            draggedPiece.dataset.index = targetIndex;
            this.dataset.index = draggedIndex;

            // Swap background positions
            let tempBg = draggedPiece.style.backgroundPosition;
            draggedPiece.style.backgroundPosition = this.style.backgroundPosition;
            this.style.backgroundPosition = tempBg;

            checkWin();
        });
    });

    function checkWin() {
        let currentOrder = Array.from(document.querySelectorAll(".puzzle-piece"))
            .map(piece => piece.dataset.index);
        
        if (JSON.stringify(currentOrder) === JSON.stringify(["0", "1", "2", "3", "4", "5", "6", "7", "8"])) {
            message.classList.remove("hidden");
        }
    }
});
