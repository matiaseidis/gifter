package org.ani.zation.listeners;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.Executors;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.cronopios.regalator.CanonicalCategory;
import org.cronopios.regalator.CanonicalCategoryJaccardDistance;
import org.cronopios.regalator.GiftWeighter;
import org.cronopios.regalator.WeightableWeighter;
import org.cronopios.regalator.ml.MLCategory;
import org.cronopios.regalator.ml.MLCategoryParser;
import org.cronopios.regalator.ml.MLSearchingService;

import com.google.common.collect.Lists;

public class UpListener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {

			Collection<CanonicalCategory> mlCategories = mercadoLibreTargetCategories();
			Collection<CanonicalCategory> all = Lists.newLinkedList();

			all.addAll(mlCategories);

			GiftWeighter<CanonicalCategory> giftWeighter = new WeightableWeighter();
			CanonicalCategoryJaccardDistance metric = new CanonicalCategoryJaccardDistance();

			MLSearchingService mlSearchingService = new MLSearchingService();

			arg0.getServletContext().setAttribute("categories", all);
			arg0.getServletContext().setAttribute("metric", metric);
			arg0.getServletContext().setAttribute("giftWeighter", giftWeighter);
			arg0.getServletContext().setAttribute("searchingService", mlSearchingService);

			arg0.getServletContext().setAttribute("execPool", Executors.newFixedThreadPool(120));

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
	}

	private static Collection<CanonicalCategory> mercadoLibreTargetCategories() throws IOException {
		MLCategoryParser mlCategoryParser = new MLCategoryParser();
		List<MLCategory> mlCategories = mlCategoryParser.parseCachedMLCategories();

		Collection<? extends CanonicalCategory> r = mlCategories;
		return (Collection<CanonicalCategory>) r;
	}

}
