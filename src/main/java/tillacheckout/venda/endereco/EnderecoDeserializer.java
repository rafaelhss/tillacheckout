package tillacheckout.venda.endereco;

import com.google.gson.*;

import java.lang.reflect.Type;

/**
 * Created by rafa on 27/08/2016.
 */
public class EnderecoDeserializer implements JsonDeserializer<Endereco> {
    @Override
    public Endereco deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        Endereco e = new Endereco();


        JsonObject obj = jsonElement.getAsJsonObject();
        if(obj.get("bairro") != null) {
            e.setBairro(obj.get("bairro").getAsString());
        }
        if(obj.get("cidade") != null) {
            e.setCidade(jsonElement.getAsJsonObject().get("cidade").getAsString());
        }
        if(obj.get("cep") != null) {
            e.setCep(jsonElement.getAsJsonObject().get("cep").getAsString());
        }
        if(obj.get("logradouro") != null) {
        e.setLogradouro(jsonElement.getAsJsonObject().get("logradouro").getAsString());
        }
        if(obj.get("estado") != null) {
        e.setEstado(jsonElement.getAsJsonObject().get("estado").getAsString());
        }
        if(obj.get("numero") != null) {
        e.setNumero(jsonElement.getAsJsonObject().get("numero").getAsString());
        }
        if(obj.get("ap") != null) {
        e.setAp(jsonElement.getAsJsonObject().get("ap").getAsString());
        }
        return e;

    }
}
