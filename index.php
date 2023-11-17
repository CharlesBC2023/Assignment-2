<html>
	<head>
		<title>Minesweeper</title>
		<script type="text/javascript" src="function.js"></script>
		<script type="text/javascript" src="class.js"></script>
	</head>

	<body onload="avoid_image_loading_delay()">
		<button id="start">Start</button>&nbsp;&nbsp;&nbsp;&nbsp;
		<span id="game_over" style="display: none">Game Over</span>
		<br/><br/>
		<script>
	    	<!-- PLACE YOUR IMPLEMENTATION BELOW -->
            //TAKE THE NUMBER OF ROWS, COLS, PROB FROM THE USER
            const rows = <?=intval($_GET['rows'] ?? 15)?>;
            const cols = <?=intval($_GET['cols'] ?? 15)?>;
            const prob = <?=floatval($_GET['prob'] ?? 0.1)?>;
            let game = new Minesweeper(rows, cols, prob);
            // Listen for the start button to be clicked
            document.getElementById("start").addEventListener("click", function() {
                // Change the start button to a reset button
                this.innerHTML = "Reset";
                game.unlock();
                game.init_board();
            });
            function avoid_image_loading_delay() {
                // TODO??
            }
            <!-- PLACE YOUR IMPLEMENTATION ABOVE -->
		</script>
	</body>
</html>