package com.brisco.Score;

import java.util.ArrayList;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.brisco.Game.Board;
import com.brisco.Game.Contract;
import com.brisco.Players.Table;

public class IMPsAcrossScoringEngineTest {
	private ArrayList<Result> smallResult;
	private Result res1;
	private Result res2;
	private Result res3;
	private IMPsAcrossScoringEngine engine = new IMPsAcrossScoringEngine();
	private Result GetEmptyResult() {
		return new Result(new Contract(), new Board(1), new Table());
	}
	@Before
	public void setUp() throws Exception {
		smallResult = new ArrayList<Result>();
		res1 = GetEmptyResult();
		res1.NorthSouthPoints = 100;
		smallResult.add(res1);
		res2 = GetEmptyResult();
		res2.NorthSouthPoints = 500;
		smallResult.add(res2);
		res3 = GetEmptyResult();
		res3.NorthSouthPoints = 500;
		smallResult.add(res3);
		engine.ScoreBoard(smallResult);
	}

	@After
	public void tearDown() throws Exception {
		smallResult = null;
	}

	@Test
	public final void testScoreBoard_2xminus400_equals_minus18() {
		Assert.assertEquals(-18, (int)res1.NorthSouthScore);
	}
	@Test
	public final void testScoreBoard_1x400_equals_9() {
		Assert.assertEquals(9, (int)res2.NorthSouthScore);
	}

}
