package org.ani.zation.listeners;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.ani.zation.recommender.GifterSession;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.cronopios.regalator.CanonicalCategory;
import org.cronopios.regalator.CanonicalCategoryJaccardDistance;
import org.cronopios.regalator.GiftWeighter;
import org.cronopios.regalator.KNearestSpheresYesNoGiftRecommender;
import org.cronopios.regalator.NeighboursWithinSphereYesNoGiftRecommender;

public class SessionListener  implements HttpSessionListener {
	
	protected static final Log log = LogFactory.getLog(SessionListener.class);


	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		
		log.debug("NEW SESSION!!!");
		System.out.println("NEW SESSION!!!");

		ServletContext ctx = arg0.getSession().getServletContext();
		Collection<CanonicalCategory> categories = (Collection<CanonicalCategory>) ctx.getAttribute("categories");
		CanonicalCategoryJaccardDistance metric = (CanonicalCategoryJaccardDistance) ctx.getAttribute("metric");
		GiftWeighter<CanonicalCategory> giftWeighter = (GiftWeighter<CanonicalCategory>) ctx.getAttribute("giftWeighter");
		
		KNearestSpheresYesNoGiftRecommender<CanonicalCategory> yesNoGiftRecommender = 
				new NeighboursWithinSphereYesNoGiftRecommender<CanonicalCategory>(
				categories, metric, giftWeighter);
		
		arg0.getSession().setAttribute("gifter", new GifterSession(yesNoGiftRecommender));

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub

	}

}
