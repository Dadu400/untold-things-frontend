import SinglePost from "../posts/SinglePost";

function ValentinesPosts() {
    return (
        <section className="w-[90%] md:w-[85%] flex flex-col mx-auto mt-6 mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-center font-gakruli mb-10">სიყვარულის დღე</h1>
            <div className="container grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 gap-y-12 place-items-center">
            <SinglePost id={2830} messageTo={"ყველას"}
                    message={"ყოველი დღე ხომ სიყვარულისა? ყოველდღე შეგვიძლია გავახაროთ ერთმანეთი. რამნიშვნელობა აქ ეს 14 იქნება თუ 18. სულ გაბედნიერეთ ერთმანეთი💌გიყვარდეთ და გწამდეთ ყოველი დღე🫂"}
                    timestamp={1739559353371}
                    likes={0}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2808} messageTo={"მას"}
                    message={"ვალენტინობას გილოცავ ნაცნობო, აბა სხვა არაფერი ხარ და 🥲"}
                    timestamp={1739528780973}
                    likes={4}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2795} messageTo={"****"}
                    message={"ვალენტინობას გილოცავ...⭐️"}
                    timestamp={1739487789082}
                    likes={7}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2789} messageTo={"🦦🫱🏻‍🫲გ"}
                    message={"სიყვარულის დღეს გილოცავ, მინდა მთელი ცხოვრება სიყვარულში და ბედნიერებაში გავატაროთ 😵‍💫 ძალიან მიყვარხარ. მესამე თვე დაიწყო რაც ერთად არ ვართ 💔იმედი მაქვს ნახავ და მიცნობ 🫂 ყველა ტკივილის მიუხედავად მაინც ჩემი გული ხარ😉"}
                    timestamp={1739528780973}
                    likes={2}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2786} messageTo={"ხატია"}
                    message={"დღეს პარასკევია და მე უბრალოდ მიყვარხარ. აი ასე ნებისმიერი ეპითეტის გარეშე, უბრალოდ მიყვარხარ, ჩემო პრინცესა. დოჩანაშვილს აქვს დაწერილი, ლამაზი იყო როგორც თვითონ და მეც მიყვარხარ როგორც შენ"}
                    timestamp={1739528780973}
                    likes={4}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2782} messageTo={"."}
                    message={"შენ ხარ აქამდე რაც უნდა მეთქვა, შენ ხარ ოთახში ჰაერზე მეტი"}
                    timestamp={1739528780973}
                    likes={4}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2699} messageTo={"ბ"}
                    message={"Be my valentine🪄"}
                    timestamp={1739385394832}
                    likes={1}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2751} messageTo={"L🤞🏼"}
                    message={"8 მილიარდი ადამიანია და მე მაინც შენ გიპოვნე💕⭐️"}
                    timestamp={1739449977804}
                    likes={2}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
                <SinglePost id={2668} messageTo={"ლუკა"}
                    message={"რა თებერვალი? რის თოთხმეტი? ვინ ვალენტინი? ჟანგბადზე მეტად შენ მჭირდები, რომ ვიარსებო. ერთი დღე იმათ ქონდეთ ვინც მაგ დღეს ზეიმობს, ჩემთვის კი ყოველი დღე ზეიმია სადაც შენ ხარ!"}
                    timestamp={1739364120375}
                    likes={1}
                    shares={0}
                    liked={false}
                    messageStatus={'1'} 
                    disabled={true} />
            </div>
        </section>
    );
}

export default ValentinesPosts;