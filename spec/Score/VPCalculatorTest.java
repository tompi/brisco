package com.brisco.Score;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

public class VPCalculatorTest {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public final void IMP0is15_15() {
		VPPoints actual = VPCalculator.GetWBFVP(0, 16);

		Assert.assertEquals(15, actual.WinnerVP);
	}

	@Test
	public final void IMP130is25_0() {
		VPPoints actual = VPCalculator.GetWBFVP(130, 16);

		Assert.assertEquals(25, actual.WinnerVP);
		Assert.assertEquals(0, actual.LoserVP);
	}

	@Test
	public final void IMP20Boards20is19_11() {
		VPPoints actual = VPCalculator.GetWBFVP(20, 20);

		Assert.assertEquals(19, actual.WinnerVP);
		Assert.assertEquals(11, actual.LoserVP);
	}

	@Test
	public final void IMP15Boards32is17_13() {
		VPPoints actual = VPCalculator.GetWBFVP(15, 32);

		Assert.assertEquals(17, actual.WinnerVP);
		Assert.assertEquals(13, actual.LoserVP);
	}

	@Test
	public final void IMP45Boards9is25_2() {
		VPPoints actual = VPCalculator.GetWBFVP(45, 9);

		Assert.assertEquals(25, actual.WinnerVP);
		Assert.assertEquals(2, actual.LoserVP);
	}

	@Test
	public final void IMP4Boards48is15_15() {
		VPPoints actual = VPCalculator.GetWBFVP(4, 48);

		Assert.assertEquals(15, actual.WinnerVP);
		Assert.assertEquals(15, actual.LoserVP);
	}

	@Test
	public final void IMP4Boards52is15_15() {
		VPPoints actual = VPCalculator.GetWBFVP(4, 52);

		Assert.assertEquals(15, actual.WinnerVP);
		Assert.assertEquals(15, actual.LoserVP);
	}

	@Test
	public final void IMP15Boards19is18_12() {
		VPPoints actual = VPCalculator.GetWBFVP(15, 18);

		Assert.assertEquals(18, actual.WinnerVP);
		Assert.assertEquals(12, actual.LoserVP);
	}

	@Test
	public final void IMP25Boards13is22_8() {
		VPPoints actual = VPCalculator.GetWBFVP(25, 13);

		Assert.assertEquals(22, actual.WinnerVP);
		Assert.assertEquals(8, actual.LoserVP);
	}

	@Test
	public final void IMP43Boards11is25_3() {
		VPPoints actual = VPCalculator.GetWBFVP(43, 11);

		Assert.assertEquals(25, actual.WinnerVP);
		Assert.assertEquals(3, actual.LoserVP);
	}

}
