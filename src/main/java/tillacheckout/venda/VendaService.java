package tillacheckout.venda;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tillacheckout.venda.comprovante.Comprovante;
import tillacheckout.venda.endereco.Endereco;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;

/**
 * Created by rafa on 27/08/2016.
 */
@Service
@Getter
@Setter
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;


    @Transactional
    public Venda saveVenda(byte[] bytes, String whatsapp, String facebook, String produtos, Endereco endereco, String contato) {

        Comprovante comprovante = new Comprovante();
        comprovante.setFile(DatatypeConverter.parseBase64Binary(DatatypeConverter.printBase64Binary(bytes)));


        Venda venda = new Venda();
        venda.setComprovante(comprovante);
        venda.setEndereco(endereco);
        venda.setFacebook(facebook);
        venda.setWhatsapp(whatsapp);
        venda.setProdutos(produtos);
        venda.setData(new Date());
        venda.setCliente(contato);


     //   comprovanteRepository.save(comprovante);
       return vendaRepository.save(venda);

    }

}
