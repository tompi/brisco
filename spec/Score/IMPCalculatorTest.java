package com.brisco.Score;

import junit.framework.Assert;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.brisco.Game.Board;
import com.brisco.Game.Contract;
import com.brisco.Game.Direction;
import com.brisco.Game.Suit;

public class IMPCalculatorTest {
	private Board boardNotVulnerable;
	
	@Before
	public void setUp() throws Exception {
		boardNotVulnerable = new Board(1);
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public final void testGetNorthSouthIMPIntInt_100_equals_3() {
		int actual = IMPCalculator.GetNorthSouthIMP(200, 100);
		
		Assert.assertEquals(3, actual);
	}
	@Test
	public final void testGetNorthSouthIMPIntInt_minus100_equals_minus3() {
		int actual = IMPCalculator.GetNorthSouthIMP(200, 300);
		
		Assert.assertEquals(-3, actual);
	}
	@Test
	public final void testGetNorthSouthIMPIntInt_10_equals_0() {
		int actual = IMPCalculator.GetNorthSouthIMP(430, 420);
		
		Assert.assertEquals(0, actual);
	}
	@Test
	public final void testGetNorthSouthIMPIntInt_3990_equals_23() {
		int actual = IMPCalculator.GetNorthSouthIMP(4010, 20);
		
		Assert.assertEquals(23, actual);
	}
	@Test
	public final void testGetNorthSouthIMPIntInt_430_equals_10() {
		int actual = IMPCalculator.GetNorthSouthIMP(800, 370);
		
		Assert.assertEquals(10, actual);
	}
	@Test
	public final void testGetNorthSouthIMPIntInt_490_equals_10() {
		int actual = IMPCalculator.GetNorthSouthIMP(800, 310);
		
		Assert.assertEquals(10, actual);
	}

	@Test
	public final void testGetNorthSouthIMPIntInt_4000_equals_24() {
		int actual = IMPCalculator.GetNorthSouthIMP(4300, 300);
		
		Assert.assertEquals(24, actual);
	}
	@Test
	public final void testGetNorthSouthIMPIntInt_8000_equals_24() {
		int actual = IMPCalculator.GetNorthSouthIMP(8000, 0);
		
		Assert.assertEquals(24, actual);
	}

	@Test
	public final void testGetNorthSouthIMPContractContract() {
		Contract contractA = new Contract();
		contractA.Level = 4;
		contractA.Player = Direction.West;
		contractA.Doubled = true;
		contractA.ReDoubled = false;
		contractA.Suit = Suit.Diamonds;
		contractA.Tricks = 7;
		
		Contract contractB = new Contract();
		contractB.Level = 4;
		contractB.Player = Direction.West;
		contractB.Doubled = true;
		contractB.ReDoubled = false;
		contractB.Suit = Suit.Diamonds;
		contractB.Tricks = 8;
		
		int northIMP = IMPCalculator.GetNorthSouthIMP(boardNotVulnerable, contractA, contractB);
		
		Assert.assertEquals(5, northIMP);	
	}

}
