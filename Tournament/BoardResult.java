package com.brisco.Tournament;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;

import com.brisco.Game.Board;
import com.brisco.Game.Contract;
import com.brisco.Players.Table;
import com.brisco.Score.IScoringEngine;
import com.brisco.Score.Result;

public final class BoardResult implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2223490167454432442L;
	public Board Board;
	public ArrayList<Result> Results;

	public BoardResult(Board board) {
		Board = board;
		Results = new ArrayList<Result>();
	}

	public void AddContract(Contract contract, Table table) {
		Results.add(new Result(contract, Board, table));
	}

	public void Score(IScoringEngine engine) {
		engine.ScoreBoard(Results);
	}

	public void Sort() {
		Collections.sort(Results);
	}
}
