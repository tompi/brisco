package com.brisco.Score;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

public class RussianIMPCalculatorTest {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public final void testGetResult_20_v_equals_0() {
		int actual = RussianIMPCalculator.GetExpectedResult(20, true);

		Assert.assertEquals(0, actual);
	}

	@Test
	public final void testGetResult_40_v_equals_1950() {
		int actual = RussianIMPCalculator.GetExpectedResult(40, true);

		Assert.assertEquals(1950, actual);
	}

	@Test
	public final void testGetResult_18_v_equals_minus70() {
		int actual = RussianIMPCalculator.GetExpectedResult(18, true);

		Assert.assertEquals(-70, actual);
	}

	@Test
	public final void testGetResult_32_nv_equals_700() {
		int actual = RussianIMPCalculator.GetExpectedResult(32, false);

		Assert.assertEquals(700, actual);
	}

	@Test
	public final void testGetIMP_170_24_v_equals_minus3() {
		int actual = RussianIMPCalculator.GetIMP(170, 24, true, false);

		Assert.assertEquals(-3, actual);
	}

	@Test
	public final void testGetIMP_420_18_nv_equals_10() {
		int actual = RussianIMPCalculator.GetIMP(420, 18, false, false);

		Assert.assertEquals(10, actual);
	}

	@Test
	public final void testGetIMP_550_27_nv_equals_10() {
		int actual = RussianIMPCalculator.GetIMP(550, 27, false, false);

		Assert.assertEquals(4, actual);
	}

	@Test
	public final void testGetIMP_minus50_12_nv_v_equals_11() {
		int actual = RussianIMPCalculator.GetIMP(-50, 12, false, true);

		Assert.assertEquals(11, actual);
	}

}
