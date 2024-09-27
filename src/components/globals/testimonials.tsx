import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Testimonials = () => {
  return (
    <div>
      <p className="text-2xl font-bold mb-5">Testimonials</p>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <Link
                href={"https://www.facebook.com/RoninasSipocot/reviews"}
                target="_blank"
                className="flex items-center gap-3"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src="https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-6/302188518_1746204399094337_6837382246442329639_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGvXJfzWPw3aAUTPBwW_9F22ndQyq2Vpw_ad1DKrZWnDzZvmAUL1Vw1gZGGEchAxwJ2mLW6h6OziCMsDFrK_42l&_nc_ohc=BnZsAIcVoMUQ7kNvgGZmPW7&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=AIm4pnUU95sz_qgNt5uCpUU&oh=00_AYC0BuIOF8I02wx3O5Gk23WThLiz6y_FCyOwOIavgaoZ5w&oe=66FA3D63" />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">Sylden Ramos</p>
                  <p className="text-sm text-muted-foreground">
                    May 5, 2024 at 4:41 PM
                  </p>
                </div>
              </Link>
            </div>
            <p className="mt-3 text-sm">
              Mababait yung staff and very accommodating. Malinis and maganda
              din yung rooms and pool. Highly recommended! Family-friendly ·
              Good room service · Quiet rooms · Thoughtful amenities
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <Link
                href={"https://www.facebook.com/RoninasSipocot/reviews"}
                target="_blank"
                className="flex items-center gap-3"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/365792257_5643570739079274_7473131340214366267_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGCrXVe2g32k_lm85UG4YjKb0u0tI4aorhvS7S0jhqiuL5DarjAcdNn0q6unTpWwLSHLzS5Ml9Tse7QXgAj6DaR&_nc_ohc=JSJh1TLLXwcQ7kNvgH_Bqu3&_nc_ht=scontent.fcrk4-1.fna&oh=00_AYBHRCWrYiOFlq8GBCGVjhaDOEIa8MHQf1VOl0CnSX9qsQ&oe=66FA510B" />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">JC Alcantara</p>
                  <p className="text-sm text-muted-foreground">
                    January 16, 2024 at 1:27 PM
                  </p>
                </div>
              </Link>
            </div>
            <p className="mt-3 text-sm">
              The ambiance is nicee and the view soliiid. 😊 Ung mga staff nila
              mababait as well as the owner. Maganda dito may coffee shop din
              sila. Ang welcoming nung vibes 💯
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;
