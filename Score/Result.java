package com.brisco.Score;

import java.io.Serializable;

import com.brisco.Game.Board;
import com.brisco.Game.Contract;
import com.brisco.Players.Table;

public class Result implements Comparable<Result>, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2650538391909511350L;
	public Contract Contract;
	public Board Board;
	public Table Table;
	public int NorthSouthPoints;
	public double NorthSouthScore;

	public Result(Contract contract, Board board, Table table) {
		Contract = contract;
		Board = board;
		Table = table;
		NorthSouthPoints = Calculator.GetNorthSouthPoints(Contract, Board);
	}

	public int compareTo(Result result) {
		if (result == null) {
			return 1;
		}
		return Double.compare(NorthSouthScore, result.NorthSouthScore);
	}
}
