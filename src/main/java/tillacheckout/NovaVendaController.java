package tillacheckout;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tillacheckout.venda.Venda;
import tillacheckout.venda.VendaRepository;
import tillacheckout.venda.VendaService;
import tillacheckout.venda.VendaStatus;
import tillacheckout.venda.endereco.Endereco;
import tillacheckout.venda.endereco.EnderecoDeserializer;

import java.util.List;

@SpringBootApplication
@RestController
//@EnableOAuth2Sso
public class NovaVendaController {

    @Autowired
    private VendaService vendaService;

    @Autowired
    private VendaRepository vendaRepository;


    @PostMapping("/api/vendapendente")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody Venda registrarVenda(@RequestBody Venda venda){
        venda.setVendaStatus(VendaStatus.AGUARDANDO_ENDERECO);
        venda = vendaRepository.save(venda);

        return venda;
    }


    @PostMapping("/api/vendapendente/{codigo}")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean confirmarVenda(@PathVariable("codigo") Long codigo, @RequestBody Endereco endereco){

        Venda vendaPendente = vendaRepository.findOne(codigo);
        if(vendaPendente != null) {

            vendaPendente.setVendaStatus(VendaStatus.PEDIDO_RECEBIDO);
            vendaPendente.setEndereco(endereco);
            System.out.println("venda end:" + vendaPendente.getEndereco().getLogradouro());


            vendaRepository.save(vendaPendente);
            return true;
        }

        return false;
    }


    @RequestMapping(method = RequestMethod.GET, value="/api/vendapendente/{codigo}")
    public @ResponseBody
    Venda buscarVenda(@PathVariable("codigo") Long codigo){
        System.out.println("codigo: " + codigo);
        System.out.println(vendaRepository.findOne(codigo));
        return vendaRepository.findOne(codigo);
    }

}