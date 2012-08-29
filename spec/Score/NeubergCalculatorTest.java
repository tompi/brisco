package com.brisco.Score;

import org.junit.Assert;
import org.junit.Test;

public class NeubergCalculatorTest {

	@Test
	public final void testGetAdjustedScore_4p_6p_7sp() {
		NeubergCalculator calc = new NeubergCalculator(6, 7);
		int actual = calc.GetAdjustedScoreTimes10(4);
		Assert.assertEquals(48, actual);
	}

	@Test
	public final void testGetAdjustedScore_9p_6p_7sp() {
		NeubergCalculator calc = new NeubergCalculator(6, 7);
		int actual = calc.GetAdjustedScoreTimes10(9);
		Assert.assertEquals(107, actual);
	}

}
