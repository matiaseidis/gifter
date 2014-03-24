package org.ani.zation.listeners;

import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.cronopios.regalator.CanonicalCategory;
import org.cronopios.regalator.CanonicalCategoryJaccardDistance;
import org.cronopios.regalator.GiftRecommendation;
import org.cronopios.regalator.GiftRecommender;
import org.cronopios.regalator.GiftWeighter;
import org.cronopios.regalator.KNearestSpheresYesNoGiftRecommender;
import org.cronopios.regalator.NeighboursWithinSphereYesNoGiftRecommender;
import org.cronopios.regalator.WeightableWeighter;
import org.cronopios.regalator.filters.CategoryStringFilter;
import org.cronopios.regalator.filters.NoLeafFilter;
import org.cronopios.regalator.filters.OtrosFilter;
import org.cronopios.regalator.icecat.IceCatCategory;
import org.cronopios.regalator.icecat.IceCatParser;
import org.cronopios.regalator.ml.MLCategory;
import org.cronopios.regalator.ml.MLCategoryParser;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

public class UpListener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {

			// Collection<CanonicalCategory> iceCategories = iceCategories();
			Collection<CanonicalCategory> mlCategories = mercadoLibreTargetCategories();
			Collection<CanonicalCategory> all = Lists.newLinkedList();

			all.addAll(mlCategories);
			// all.addAll(iceCategories);

			GiftWeighter<CanonicalCategory> giftWeighter = new WeightableWeighter();
			CanonicalCategoryJaccardDistance metric = new CanonicalCategoryJaccardDistance();

			arg0.getServletContext().setAttribute("categories", all);
			arg0.getServletContext().setAttribute("metric", metric);
			arg0.getServletContext().setAttribute("giftWeighter", giftWeighter);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

	}

	// private static Collection<CanonicalCategory> iceCategories()
	// throws FileNotFoundException {
	// Collection<? extends IceCatCategory> iceCategories = new
	// IceCatParser().parse();
	// new NoLeafFilter().filter(iceCategories);
	// return (Collection<CanonicalCategory>) iceCategories;
	// }

	private static Collection<CanonicalCategory> mercadoLibreTargetCategories()
			throws FileNotFoundException {
		MLCategoryParser mlCategoryParser = new MLCategoryParser();
		List<MLCategory> mlCategories = mlCategoryParser
		// .parseMLCategories("mltest.json");
				.parseMLCategories("ml-categories-ar.json");

		new OtrosFilter().filter(mlCategories);
		new CategoryStringFilter("Inmuebles").filter(mlCategories);
		new CategoryStringFilter("Servicios", "Profesionales")
				.filter(mlCategories);
		new CategoryStringFilter("Servicios", "Medicina y Salud")
				.filter(mlCategories);
		new CategoryStringFilter("Servicios", "Transporte")
				.filter(mlCategories);

		// new FlagBasedBrandFilter().filter(mlCategories);
		new NoLeafFilter().filter(mlCategories);

		printMLStats(mlCategories);
		Collection<? extends CanonicalCategory> r = mlCategories;
		return (Collection<CanonicalCategory>) r;
	}

	private static void printMLStats(List<MLCategory> allMlCategories) {
		int ninos = 0;
		int ninas = 0;
		int mujer = 0;
		int hombre = 0;
		int discarded = 0;
		int leaves = 0;
		int otros = 0;
		int total = 0;
		int inmuebles = 0;
		int candidates = 0;
		for (MLCategory mlCategory : allMlCategories) {
			boolean isInmuebles = mlCategory.isFor("Inmuebles");
			if (isInmuebles) {
				inmuebles++;
			}
			if (mlCategory.isFor("Ninas")) {
				ninas++;
			}
			if (mlCategory.isFor("Ninos")) {
				ninos++;
			}
			if (mlCategory.isFor("Hombre")) {
				hombre++;
			}
			if (mlCategory.isFor("Mujer")) {
				mujer++;
			}
			if (mlCategory.isFor("Otros")) {
				otros++;
			}
			if (mlCategory.isFor("Otras")) {
				otros++;
			}
			if (!mlCategory.isLeaf()) {
				discarded++;
			} else {
				candidates++;
			}

			if (mlCategory.getChildren_categories().isEmpty()) {
				leaves++;
			}
			total++;

		}
		System.out.println("Niñas " + ninas);
		System.out.println("Niños " + ninos);
		System.out.println("Mujer " + mujer);
		System.out.println("Hombre " + hombre);
		System.out.println("Otros " + otros);
		System.out.println("Leaves " + leaves);
		System.out.println("Discarded " + discarded);
		System.out.println("Inmuebeles " + inmuebles);
		System.out.println("Candidates " + candidates);
		System.out.println("Total " + total);
	}

}
