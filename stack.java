import java.util.*;
class stack{
    public static void main(String args[])
    {
        ArrayList<Integer>list=new ArrayList<>();
        list.add(1);
        System.out.println(list);
        int a=Math.max(1,3);
        System.out.println(a);
        Scanner sc=new Scanner(System.in);
        String s=sc.next();
        Stack<Character> st=new Stack<>();
        for(int i=0;i<s.length();i++)
        {
            if(s.charAt(i)=='(')
            st.push(')');
            else if(s.charAt(i)=='[')
            st.push(']');
            else if(s.charAt(i)=='{')
            st.push('}');
            else 
            {
                if(st.isEmpty() || s.charAt(i)!=st.pop()) {System.out.println("false" );
                System.exit(0);
                }
            }
        }
        if(st.isEmpty())
        System.out.println("true");
        else
        System.out.println("false");
    }
}