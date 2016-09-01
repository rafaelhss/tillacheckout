package tillacheckout.mail;

        import com.sun.jersey.core.util.MultivaluedMapImpl;
        import com.sun.jersey.multipart.FormDataMultiPart;
        import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;
        import tillacheckout.venda.Venda;


        import javax.ws.rs.client.Client;
        import javax.ws.rs.client.ClientBuilder;
        import javax.ws.rs.client.Entity;
        import javax.ws.rs.client.WebTarget;
        import javax.ws.rs.core.MultivaluedMap;

/**
 * Created by deinf.rsoares on 17/06/2016.
 */
public class EmailDispatcher {


    private static final String baseURL = "https://api.mailgun.net/v2/";

    private static String mailgunAPIKey = ConfigProvider.getKey();

    private static <T> WebTarget createPrivateClient() {
        final Client client = ClientBuilder.newClient();
        client.register(HttpAuthenticationFeature.basic("api", mailgunAPIKey));
        return client.target(baseURL);
    }

    protected static void fireMailGun(final MultivaluedMap<String, String> postData) {
        createPrivateClient().path(ConfigProvider.getDomain() + "/messages")
                .request()
                .post(Entity.form(postData));
    }


    public static void SendSimpleMessage(String destination, String subject, String html) {

        MultivaluedMapImpl formData = new MultivaluedMapImpl();
        formData.add("from", "Tilla Viana Checkout <checkout@"+ConfigProvider.getDomain()+">");
        formData.add("to", destination);
        formData.add("to", "rafaelhss@gmail.com");
        formData.add("to", "bertilla.viana@gmail.com");
        formData.add("subject", subject);
        //formData.add("text", "H2i! Your network was generated and is ready to be visualized ");

        formData.add("html", html);

        fireMailGun(formData);

        System.out.println("Mandei mail");


    }
}
